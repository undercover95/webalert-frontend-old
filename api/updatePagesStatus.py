#!/usr/bin/python
# -*- coding: utf-8 -*-

import sys
import getopt

import pycurl

try:
    from io import BytesIO
except ImportError:
    from StringIO import StringIO as BytesIO

import time
import sched
import threading
import datetime

import mysql.connector
from mysql.connector import errorcode

from mailer import Mailer


class Database:

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
                print("Invalid username or password for mysql database connection")
                sys.exit()

            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Chosen database does not exists")
                sys.exit()
            else:
                print(err)
                sys.exit()

    def disconnect(self):
        self.conn.close()


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

    buff = BytesIO()
    hdr = BytesIO()

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


def update_sites_status(user_id=None, site_id=None):
    db.connect()
    cursor = db.conn.cursor(dictionary=True, buffered=True)

    # get users list
    get_users_sql = "SELECT `id`,`mail_address` FROM `users`"
    if user_id is not None:
        get_users_sql = "SELECT `id`,`mail_address` FROM `users` WHERE `id`='%s'" % user_id

    try:
        cursor.execute(get_users_sql)
    except mysql.connector.errors.Error as err:
        print(err)
        sys.exit()

    if cursor.rowcount == 0:
        print("No users found in database.")
        exit(1)

    users = cursor.fetchall()

    for user in users:
        print(user['mail_address'])
        # get last status of websites for specific user id
        user_id = user['id']

        get_last_pages_status_sql_for_user_id = ''
        if site_id is None:
            get_last_pages_status_sql_for_user_id = """
                SELECT site.`url`, last_status.*
                FROM `pages` site JOIN `pages_status` last_status ON site.`id` = last_status.`site_id`
                AND site.`user_id`=%s
                LEFT JOIN `pages_status` not_last_status ON (
                    site.`id` = `not_last_status`.`site_id`
                    AND last_status.`last_checked` < not_last_status.`last_checked`
                )
                WHERE not_last_status.`site_id` IS NULL
            """ % user_id
        else:
            get_last_pages_status_sql_for_user_id = """
                SELECT `pages`.`url`, `pages_status`.*
                FROM `pages`,`pages_status`
                WHERE `pages_status`.`site_id`=`pages`.`id`
                AND `pages`.`id`=%s AND `pages`.`user_id`=%s
                ORDER BY `last_checked` DESC LIMIT 1
            """ % (site_id, user_id)

        try:
            cursor.execute(get_last_pages_status_sql_for_user_id)
        except mysql.connector.errors.Error as err:
            print(err)
            sys.exit()

        if cursor.rowcount == 0:
            print("Site id '%s' not found in database." % site_id)
            exit(1)

        for row in cursor.fetchall():
            # go through each site in user's site
            # print("Website: %s" % row['url'])
            update_site_status(user, row)

    db.conn.commit()
    print("Updating all pages completed")
    cursor.close()
    db.disconnect()


def update_site_status(user_data, last_status_row_data):
    cursor = db.conn.cursor(dictionary=True, buffered=True)
    row = last_status_row_data
    # look for checking a few times if website is working when server is not responding
    # it makes checking more reliable
    code = None
    time = None
    not_working = False

    for i in range(0, 2):
        print("Checking website: %s" % row['url'])
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

    # ####
    # save current state to database
    update_page_sql = ""

    last_status_code = None
    # website, which has just inserted, has NULL in status_code field
    if row['status_code'] == "" or row['status_code'] == None:
        last_status_code = -100  # prevent errors
    else:
        last_status_code = row['status_code']

    if check_if_working(code) != 0:
        # website not working
        print("website %s not working" % row['url'])

        if check_if_working(last_status_code) == 0:
            # not working now, but it worked last time
            print("%s not working now, but it worked last time" % row['url'])

            update_page_sql = "INSERT INTO `pages_status` (`site_id`, `status_code`, `last_checked`, `last_working_time`) VALUES (%s, %s, now(), now())" % (
                row['site_id'], code)

            try:
                cursor.execute(update_page_sql)

            except mysql.connector.errors.Error as err:
                print("Cannot update page status of %s!" % row['url'])
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

            # send notification
            # create_notification_sql = "INSERT INTO `notifications` (`user_id`, `title`, `content`, `type`) VALUES (%s, '%s', '%s', '%s')" % (
            #     user_data['id'], 'Strona przestała działać!', 'Strona '+row['url']+' nie działa!', 'warning')
            # try:
            #     cursor.execute(create_notification_sql)

            # except mysql.connector.errors.Error as err:
            #     pass

            timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            msg = mailer_service.prepare_failure_msg(
                row['url'], code, code_description, timestamp)
            mailer_service.send_email(
                msg[0], msg[1], user_data['mail_address'])

        elif check_if_working(last_status_code) != 0:
            # not working now and didn't worked last time
            print("not working now and didn't worked last time")

            if row['last_working_time'] is not None:
                update_page_sql = "INSERT INTO `pages_status` (`site_id`, `status_code`, `last_checked`, `last_working_time`) VALUES (%s, %s, now(), '%s')" % (
                    row['site_id'], code, row['last_working_time'])
            else:
                # new page case
                update_page_sql = "INSERT INTO `pages_status` (`site_id`, `status_code`, `last_checked`) VALUES (%s, %s, now())" % (
                    row['site_id'], code)

            try:
                cursor.execute(update_page_sql)

            except mysql.connector.errors.Error as err:
                print("Cannot update page status of '" + row['url'] + "'.")
                print(err)
                pass

    else:
        update_page_sql = "INSERT INTO `pages_status` (`site_id`, `status_code`, `last_checked`, `last_working_time`,  `last_response_time`) VALUES (%s, %s, now(), now(), %s)" % (
            row['site_id'], code, time)

        try:
            cursor.execute(update_page_sql)
        except mysql.connector.errors.Error as err:
            print("Cannot update page status of '" + row['url'] + "'.")
            print(err)
            pass

        if check_if_working(last_status_code) != 0:
            # working now, but it didn't worked last time
            print("working now, but it didn't worked last time")
            print("send email about working for site "+row['url'])

            # send notification
            # create_notification_sql = "INSERT INTO `notifications` (`user_id`, `title`, `content`, `type`) VALUES (%s, %s, %s, '%s')" % (
            #     user_data['id'], 'Strona znów działa.', 'Strona '+row['url']+' zaczęła działać.', 'success')
            # try:
            #     cursor.execute(create_notification_sql)
            # except mysql.connector.errors.Error as err:
            #     pass

            timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            msg = mailer_service.prepare_success_msg(
                row['url'], row['last_working_time'], timestamp)
            mailer_service.send_email(
                msg[0], msg[1], user_data['mail_address'])

    db.conn.commit()
    print("Updating status of %s with code %s completed.\n" %
          (row['url'], code))
    cursor.close()


if __name__ == '__main__':

    opts = None
    args = None

    try:
        opts, args = getopt.getopt(sys.argv[1:], 'u:')
    except getopt.GetoptError as err:
        print("Unrecognized option '%s'." % str(err)[7:9])
        sys.exit(2)

    user_id = None
    for opt, val in opts:
        if opt == '-u':
            if val.isdigit():
                user_id = val
            else:
                print(
                    "'%s' is not properly value for option -u!\nUser id must be integer." % val)
                sys.exit(2)

    import json
    with open('config.json') as f:
        configFile = json.load(f)

    dbconf = configFile['db_props']
    db = Database(dbconf['username'], dbconf['password'],
                  dbconf['hostname'], dbconf['db_name'])

    mailer_service = Mailer()

    if user_id is None:
        print("Running checking once all websites for all users now...")
        update_sites_status()

    else:
        if len(args) == 0:
            print("Running checking once all websites for user_id: %s now..." % user_id)
            update_sites_status(user_id=user_id)
        else:
            for site_id in args:
                print("Running checking status of website id: %s for user_id: %s" % (
                    site_id, user_id))
                update_sites_status(user_id=user_id, site_id=site_id)
