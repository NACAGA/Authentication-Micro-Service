# Use an official MySQL image as the base image
#FROM mysql:8.0-bullseye
FROM mariadb:lts-jammy

# Expose the default MySQL port
EXPOSE 3306

# run the command to start MySQL
CMD ["mysqld", "--default-authentication-plugin=mysql_native_password"]