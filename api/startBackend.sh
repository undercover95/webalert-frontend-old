#!/bin/bash

function startMysqlServer() {
    echo "Starting mysql server..."
    echo $(docker run -d --rm --name mysql57 --rm -e MYSQL_ROOT_PASSWORD=1995 -e TZ='Europe/Warsaw' -v "/home/michal/docker_mysqldata":/var/lib/mysql mysql:5.7) 
    if [ $? -ne 0 ]; then
            echo "Cannot start mysql server!"
            exit 1
    fi
    echo "Done"
}

function startAPIServer() {
    echo "Starting API server..."
    echo $(docker run -d --rm -p 3000:3000 -v "$PWD":/api --name monitor-stron-api --link mysql57 api) 
    if [ $? -ne 0 ]; then
            echo "Cannot start API server!"
            exit 1
    fi
    echo "Done"
}

function startPhpmyadmin() {
    echo "Starting phpmyadmin..."
    echo $(sudo docker run --name phpmyadmin -d --rm --link mysql57:db -p 8080:80 phpmyadmin/phpmyadmin)
    if [ $? -ne 0 ]; then
        echo "Cannot start phpmyadmin!"
        exit 1
    fi 
    echo "Done"
}

case "$1" in
    "--db")
        startMysqlServer
        ;;
    "--api") 
        startAPIServer
        ;;
    "--phpmyadmin") 
        startPhpmyadmin
        ;;
    *)  
        startMysqlServer
        echo
        startPhpmyadmin
        echo
        startAPIServer
        echo
        
        echo "All services started successfully"
        ;;
esac
