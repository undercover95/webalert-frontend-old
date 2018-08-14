#!/bin/bash
echo "Starting mysql server..."
echo $(docker run -d --rm --name mysql --rm -e MYSQL_ROOT_PASSWORD=1995 -e MYSQL_DATABASE=page_monitor_db -e MYSQL_USER=admin -e MYSQL_PASSWORD=1995 -e TZ='Europe/Warsaw' -v "$PWD/mysqldata":/var/lib/mysql mysql:5.7)

echo "Starting backend server..."
echo $(docker run -d -p 3000:3000 -v "$PWD":/api --rm --name monitor-api --link mysql:mysql api)

echo "Done."