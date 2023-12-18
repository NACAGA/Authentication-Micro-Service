# Use an official MySQL image as the base image
#FROM mysql:8.0-bullseye
FROM mariadb:lts-jammy

# Set the root password for MySQL
ENV MYSQL_ROOT_PASSWORD=root_password

# Copy SQL script to initialize the database
COPY init.sql /docker-entrypoint-initdb.d/
COPY init2.sql /docker-entrypoint-initdb.d/

# run the command to start MySQL
CMD ["mysqld", "--default-authentication-plugin=mysql_native_password"]