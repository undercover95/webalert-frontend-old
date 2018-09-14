FROM ubuntu:latest

WORKDIR /api

RUN apt-get update && apt-get install -y \
        build-essential \
        curl \
        nodejs \
        npm \
        python-pip \
        libcurl4-openssl-dev \
        libssl-dev \
	cron

RUN pip install \
        pycurl \
        mysql-connector \
        sendgrid

COPY package*.json ./
RUN npm install

EXPOSE 3000

# Crontab
COPY crontab /etc/cron.d/global-updater
RUN chmod 0644 /etc/cron.d/global-updater

# Run Node JS server and Crontab
CMD [ "sh", "-c", "/etc/init.d/cron start && npm start" ]
