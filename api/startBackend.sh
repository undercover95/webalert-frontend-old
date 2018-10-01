#!/bin/bash
echo "Starting mysql server..."
echo $(docker run -d --rm --name mysql57 --rm -e MYSQL_ROOT_PASSWORD=1995 -e MYSQL_PASSWORD=1995 -e TZ='Europe/Warsaw' -v "/home/michal/docker_mysqldata":/var/lib/mysql mysql:5.7)

echo "Starting phpmyadmin..."
echo $(sudo docker run --name phpmyadmin -d --rm --link mysql57:db -p 8080:80 phpmyadmin/phpmyadmin)

echo "Starting backend server..."
echo $(docker run -d --rm -p 3000:3000 -v "$PWD":/api --name monitor-api --link mysql57 api)

echo "Done."
