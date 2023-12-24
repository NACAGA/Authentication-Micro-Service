# Use an official MySQL image as the base image
#FROM mysql:8.0-bullseye
FROM mariadb:lts-jammy

# SET ENV variables for the database
ARG MYSQL_DATABASE
ARG MYSQL_USER
ARG MYSQL_PASSWORD
ARG MYSQL_ROOT_PASSWORD

# Copy SQL script to initialize the database
COPY ./init-template.sql .

# Copy ENV variables to init.sql
RUN echo "GRANT ALL PRIVILEGES ON \`${MYSQL_DATABASE}\`.* TO '${MYSQL_USER}'@'%';" | cat - init-template.sql > /docker-entrypoint-initdb.d/init.sql

#COPY ./init-template.sql /docker-entrypoint-initdb.d/init.sql
# run the command to start MySQL
CMD ["mysqld", "--default-authentication-plugin=mysql_native_password"]