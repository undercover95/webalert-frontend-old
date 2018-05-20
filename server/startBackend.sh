#!/bin/bash
echo "Starting mysql server..."

echo $(docker run -d --rm --name mysql --rm -e MYSQL_ROOT_PASSWORD=1995 -e MYSQL_DATABASE=page_monitor_db -e MYSQL_USER=admin -e MYSQL_PASSWORD=1995 -e TZ='Europe/Warsaw' monitor-stron-mysql)

echo "Starting apache+php server..."
echo $(docker run -d -p 80:80 --rm --name backend --link mysql:mysql -v "$PWD":/var/www/html monitor-stron-backend /usr/sbin/apache2ctl -D FOREGROUND)

echo "Done."