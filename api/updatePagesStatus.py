#!/usr/bin/python

import sys, getopt

import pycurl
import cStringIO

import time, sched, threading
import datetime

import mysql.connector
from mysql.connector import errorcode

import sendgrid
import os
from sendgrid.helpers.mail import *

try:
    # Python 3
    import urllib.request as urllib
except ImportError:
    # Python 2
    import urllib2 as urllib


class Database:
    """Klasa wspomagajaca prace z baza danych"""

    def __init__(self, user, password, host, database, raise_on_warnings=True):
        self.config = {
            'user': user,
            'password': password,
            'host': host,
            'database': database,
            'raise_on_warnings': raise_on_warnings,
        }

    def connect(self):
        try:
            self.conn = mysql.connector.connect(**self.config)
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print(
                    "Invalid username or password for mysql database connection"
                )
                sys.exit()

            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Chosen database does not exists")
                sys.exit()
            else:
                print(err)
                sys.exit()

    def disconnect(self):
        self.conn.close()


class Mailer:
    """Klasa reprezentujaca mailer."""

    def __init__(self, msg_to):
        self.msg_to = msg_to  # adres do ktorego wiadomosci bd wysylane

    def send_email(self, msg_subject, msg_content):

        sg = sendgrid.SendGridAPIClient(
            apikey='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'
        )

        from_email = Email("Monitor stron internetowych <mbularz95@interia.pl>")
        to_email = Email(self.msg_to)

        subject = msg_subject
        content = Content("text/html", msg_content)

        mail = Mail(from_email, subject, to_email, content)

        # send msg
        try:
            response = sg.client.mail.send.post(request_body=mail.get())
            print "Mail sent correctly."
        except urllib.HTTPError as e:
            print "Mail sending failed."
            #print(e.read())
            exit()


    def prepare_failure_msg_and_send(self, site, response_code,
                                     code_description, timestamp):
        """Funkcja do wysylania maili o tym, ze strona przestala dzialac"""

        site_url = site
        if str(site_url[0:7]) != "http://":
            site_url = "http://" + site_url

        #print "Blad %s %s" % (code_description['code_description_short'], code_description['code_description_long'])

        alert_text = "Strona %s przestala dzialac!" % site
        msg_content = """
            <html>
                <body>
                    <div style="text-align: center">
                        <div style="background-color: #cc0000; width: 90px; height: 40px; line-height: 40px; color: white; display: inline-block">AWARIA</div>
                        <h3>Strona <a href="%s" title="Zobacz strone">%s</a> nie dziala!</h3>
                        <p>Kod odpowiedzi serwera hostujacego strone: <strong>%s</strong>. Opis bledu: <strong>%s: </strong> <i>%s</i></p>
                        <p>Strona nie dziala od: <strong>%s</strong></p>
                    <div>
                </body>
            </html>
        """ % (site_url, site, response_code,
               code_description['code_description_short'],
               code_description['code_description_long'], timestamp)

        self.send_email(alert_text, msg_content)

    def prepare_success_msg_and_send(self, site, last_response_time,
                                     timestamp):
        """Funkcja do wysylania maili o tym, ze strona zaczela dzialac"""

        alert_text = "Strona %s znow dziala." % site
        msg_content = """
            <html>
                <body>
                    <div style="text-align: center">
                        <div style="background-color: #00cc00; width: 90px; height: 40px; line-height: 40px; color: white; display: inline-block">OK</div>
                        <h3>Strona <a href="%s" title="Zobacz strone">%s</a> zaczela dzialac.</h3>
                        <p>Awaria trwala od <strong>%s</strong> do <strong>%s</strong>.</p>
                    <div>
                </body>
            </html>
        """ % (site, site, last_response_time, timestamp)

        self.send_email(alert_text, msg_content)

def check_if_working(code):
    code = int(code)
    if code >= 400 and code < 600 or code < 0:
        return -1
    else:
        return 0


def get_http_response(url, timeout=10):

    if str(url[0:8]) != "https://":
        if str(url[0:7]) != "http://":
            url = 'http://' + str(url)

    code = -2  # unknown error
    time = 0.00

    curl = pycurl.Curl()

    buff = cStringIO.StringIO()
    hdr = cStringIO.StringIO()

    curl.setopt(pycurl.URL, url)
    curl.setopt(curl.NOBODY, True)
    curl.setopt(curl.HEADER, True)
    curl.setopt(curl.VERBOSE, False)
    curl.setopt(curl.CONNECTTIMEOUT, timeout)
    curl.setopt(pycurl.TIMEOUT, timeout)

    curl.setopt(pycurl.WRITEFUNCTION, buff.write)
    curl.setopt(pycurl.HEADERFUNCTION, hdr.write)

    # 403 fix
    curl.setopt(
        pycurl.USERAGENT,
        "Mozilla/5.0 (Windows NT 6.1; Win64; x64;en; rv:5.0) Gecko/20110619 Firefox/5.0"
    )

    try:
        curl.perform()
        code = curl.getinfo(pycurl.HTTP_CODE)
        time = curl.getinfo(curl.TOTAL_TIME)

    except pycurl.error as e:
        if str(e.args[0]) == "6":
            code = -1  # DNS not resolved

    time = float("{0:.2f}".format(time))

    return {"code": code, "time": time}


def update_pages_status(site_id=None):
    db.connect()
    cursor = db.conn.cursor(dictionary=True, buffered=True)

    get_pages_sql = ""

    if site_id is None:
        get_last_pages_status_sql = """
            SELECT site.`url`, last_status.*
            FROM `pages` site JOIN `pages_status` last_status ON site.`id` = last_status.`site_id`
            LEFT JOIN `pages_status` not_last_status ON ( 
                site.`id` = `not_last_status`.`site_id`
                AND last_status.`last_checked` < not_last_status.`last_checked` 
            ) 
            WHERE not_last_status.`site_id` IS NULL 
        """
    else:
        get_last_pages_status_sql = """
            SELECT `pages`.`url`, `pages_status`.*
            FROM `pages`,`pages_status`
            WHERE `pages_status`.`site_id`=`pages`.`id` AND `pages`.`id`='%s'
            ORDER BY `last_checked` DESC LIMIT 1
        """ % site_id

    try:
        cursor.execute(get_last_pages_status_sql)
    except mysql.connector.errors.Error as err:
        print(err)
        sys.exit()

    if cursor.rowcount == 0:
        print "Site id '%s' not found in database." % site_id
        exit(1)

    for row in cursor.fetchall():

        # lool for checking a few times if website is working when server is not responding
        # it makes checking more reliable
        code = None
        time = None
        not_working = False
        for i in range(0, 2):
            print "Checking website: %s" % row['url']
            response = None
            if not_working:
                response = get_http_response(row['url'], 20)
                # if website does not work, check again with larger timetout
            else:
                response = get_http_response(row['url'])

            code = str(response['code'])
            time = str(response['time'])

            # checking
            if check_if_working(code) != 0:
                not_working = True
                continue
            else:
                break

        update_pages_sql = ""

        last_status_code = None
        # website, which has just inserted, has NULL in status_code field
        if row['status_code'] == "" or row['status_code'] == None:
            last_status_code = -100  # prevent errors
        else:
            last_status_code = row['status_code']




        if check_if_working(code) != 0:
            # website not working
            print "website not working"

            
            if check_if_working(last_status_code) == 0:
                # not working now, but it worked last time
                print "not working now, but it worked last time"

                update_pages_sql = "INSERT INTO `pages_status` (`site_id`, `status_code`, `last_checked`, `last_working_time`) VALUES (%s, %s, now(), now())" % (
                    row['site_id'], code)

                try:
                    cursor.execute(update_pages_sql)
                    print "Updating status of %s with code %s completed." % (row['url'], code)
                except mysql.connector.errors.Error as err:
                    print "Cannot update page status of '" + row['url'] + "'."
                    print(err)
                    pass




                get_code_desc_sql = "SELECT * FROM `status_codes` WHERE `status_code`=%s" % code

                try:
                    cursor.execute(get_code_desc_sql)
                except mysql.connector.errors.Error as err:
                    print(err)
                    sys.exit()

                # get HTTP Code description
                get_code_desc_row = cursor.fetchall()

                code_description = {
                    'code_description_short':
                    get_code_desc_row[0]['short_desc'],
                    'code_description_long': get_code_desc_row[0]['long_desc']
                }

                print "send email about not-working for site "+row['url_adress']

                mailer.prepare_failure_msg_and_send(row['url'], code, code_description, datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))


                generate_report_sql = "INSERT INTO `reports`(`url`, `breakdown_from`, `status_code`) VALUES('%s', '%s', '%s')" % (row['url'], datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), code)

                try:
                    cursor.execute(generate_report_sql)
                except mysql.connector.errors.Error as err:
                    print(err)
                    sys.exit()

            elif check_if_working(last_status_code) != 0:
                # not working now and didn't worked last time
                print "not working now and didn't worked last time"

                if row['last_working_time'] is not None:
                    update_pages_sql = "INSERT INTO `pages_status` (`site_id`, `status_code`, `last_checked`, `last_working_time`) VALUES (%s, %s, now(), '%s')" % (
                        row['site_id'], code, row['last_working_time'])
                else:
                    # new page case
                    update_pages_sql = "INSERT INTO `pages_status` (`site_id`, `status_code`, `last_checked`) VALUES (%s, %s, now())" % (
                        row['site_id'], code)

                try:
                    cursor.execute(update_pages_sql)
                    print "Updating status of %s with code %s completed." % (row['url'], code)
                except mysql.connector.errors.Error as err:
                    print "Cannot update page status of '" + row['url'] + "'."
                    print(err)
                    pass

        else:
            update_pages_sql = "INSERT INTO `pages_status` (`site_id`, `status_code`, `last_checked`, `last_working_time`,  `last_response_time`) VALUES (%s, %s, now(), now(), %s)" % (
            row['site_id'], code, time)


            try:
                cursor.execute(update_pages_sql)
                print "Updating status of %s with code %s completed." % (row['url'], code)
            except mysql.connector.errors.Error as err:
                print "Cannot update page status of '" + row['url'] + "'."
                print(err)
                pass



            if check_if_working(last_status_code) != 0:
                # working now, but it didn't worked last time
                print "working now, but it didn't worked last time"
                print "send email about working for site "+row['url']
                
                mailer.prepare_success_msg_and_send(row['url'], row['last_working_time'], datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
                
                
                generate_report_sql = "INSERT INTO `reports`(`url`, `breakdown_from`, `breakdown_to`, `status_code`) VALUES('%s', '%s', '%s', '%s')" % (row['url'], row['last_working_time'], datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), code)

                try:
                    cursor.execute(generate_report_sql)
                except mysql.connector.errors.Error as err:
                    print(err)
                    sys.exit()




    db.conn.commit()
    print "Updating all pages completed"
    cursor.close()
    db.disconnect()


def repeat(sc):
    update_pages_status()
    sc.enter(float(interval), 1, repeat, (sc, ))

if __name__ == '__main__':

    opts = None
    args = None

    try:
        opts, args = getopt.getopt(sys.argv[1:], 'p:')
    except getopt.GetoptError as err:
        print "Unrecognized option '%s'." % str(err)[7:9]
        usage()
        sys.exit(2)

    interval = None

    for opt, val in opts:
        if opt == '-p':
            #if val.is_number(): # modul do sprawdzenia czy cos jest liczba
            interval = val
            #else:
            # print "'%s' nie jest poprawnym interwalem dla opcji -p!\nInterwal musi byc liczba sekund." % val
            # sys.exit()

    import json
    with open('config.json') as f:
        conf = json.load(f)

    conf = conf['db_props']
    db = Database(conf['username'], conf['password'], conf['hostname'], conf['db_name'])
    mailer = Mailer('mbularz95@interia.pl')

    if not interval is None:
        print "Running periodic checking all websites now..."
        # scheduler
        scheduler = sched.scheduler(time.time, time.sleep)

        scheduler.enter(0, 1, repeat, (scheduler, ))
        scheduler.run()
    else:
        if len(args) == 0:
            print "Running checking once all websites now..."
            update_pages_status()
        else:
            for site_id in args:
                print "Running checking status of website: '%s'" % site_id
                update_pages_status(site_id)

