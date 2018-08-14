FROM ubuntu:latest

WORKDIR /api

RUN apt-get update && apt-get install -y \
        build-essential \
        curl \
        nodejs \
        npm \
        python-pip \
        libcurl4-openssl-dev \
        libssl-dev

RUN pip install \
        pycurl \
        mysql-connector \
        sendgrid

COPY package*.json ./
RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]