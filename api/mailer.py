#!/usr/bin/python
# -*- coding: utf-8 -*-

import sendgrid
import os
from sendgrid.helpers.mail import *
import json

try:
    # Python 3
    import urllib.request as urllib
except ImportError:
    # Python 2
    import urllib2 as urllib


class Mailer:

    def __init__(self):
        with open('config.json') as f:
            configFile = json.load(f)

        self.sg = sendgrid.SendGridAPIClient(
            apikey=configFile['sendgrid']['api_key']
        )

    def send_email(self, msg_subject, msg_content, msg_to):

        from_email = Email(
            "Monitor stron internetowych <mbularz95@interia.pl>")
        to_email = Email(msg_to)

        subject = msg_subject
        content = Content("text/html", msg_content)

        mail = Mail(from_email, subject, to_email, content)

        # send msg
        try:
            response = self.sg.client.mail.send.post(request_body=mail.get())
            print("Mail sent correctly.")
        except urllib.HTTPError as e:
            print("Mail sending failed.")
            exit()

    def prepare_failure_msg(self, site, response_code,
                            code_description, timestamp):
        """Send message about not working site"""

        alert_text = "[AWARIA] Strona %s przestala dzialac!" % site
        msg_content = """
            <html>
                <body>
                    <div style="text-align: center">
                        <div style="background-color: #cc0000; width: 90px; height: 40px; line-height: 40px; color: white; display: inline-block">AWARIA</div>
                        <h3>Strona <a href="%s" title="Zobacz strone">%s</a> nie dziala!</h3>
                        <p><strong>%s</strong><br/><i>%s</i></p>
                        <p>Strona nie dziala od: <strong>%s</strong></p>
                    <div>
                </body>
            </html>
        """ % (site, site,
               code_description['code_description_short'],
               code_description['code_description_long'], timestamp.strftime('%Y-%m-%d %H:%M:%S'))

        return (alert_text, msg_content)

    def prepare_success_msg(self, site, last_response_time,
                            timestamp):
        """Send message about working"""

        alert_text = "[OK] Strona %s znow dziala." % site
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
        """ % (site, site, last_response_time, timestamp.strftime('%Y-%m-%d %H:%M:%S'))

        return (alert_text, msg_content)
