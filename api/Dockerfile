FROM ubuntu:latest

WORKDIR /api

RUN apt-get update && apt-get install -y \
        build-essential \
        curl \
        python-pip \
        libssl-dev \
        libcurl4-openssl-dev \
        cron

# install node and npm
RUN curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install nodejs

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
CMD [ "sh", "-c", "/etc/init.d/cron start && npm start > server.log 2>&1" ]
