# Use an official MySQL image as the base image
#FROM mysql:8.0-bullseye
FROM mariadb:lts-jammy

# SET ENV variables for the database
ARG MARIADB_DATABASE
ARG MARIADB_USER
ARG MARIADB_PASSWORD
ARG MARIADB_ROOT_PASSWORD
ENV MARIADB_DATABASE=${MARIADB_DATABASE}
ENV MARIADB_USER=${MARIADB_USER}
ENV MARIADB_PASSWORD=${MARIADB_PASSWORD}
ENV MARIADB_ROOT_PASSWORD=${MARIADB_ROOT_PASSWORD}

# Copy SQL script to initialize the database
COPY ./init-template.sql .

# Copy ENV variables to init.sql
RUN echo "GRANT ALL PRIVILEGES ON \`${MARIADB_DATABASE}\`.* TO '${MARIADB_USER}'@'%';" | cat - init-template.sql > /docker-entrypoint-initdb.d/init.sql

#COPY ./init-template.sql /docker-entrypoint-initdb.d/init.sql
# run the command to start MySQL
CMD ["mysqld", "--default-authentication-plugin=MARIADB_native_password"]