# Use an official MySQL image as the base image
FROM mysql:latest

# Set the root password for MySQL
ENV MYSQL_ROOT_PASSWORD=root_password

# Create a database and user
ENV MYSQL_DATABASE=test_database
ENV MYSQL_USER=user1
ENV MYSQL_PASSWORD=password

# Copy SQL script to initialize the database
COPY init.sql /docker-entrypoint-initdb.d/

# Expose the default MySQL port
EXPOSE 3306

CMD ["mysqld", "--default-authentication-plugin=mysql_native_password"]
