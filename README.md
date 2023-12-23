# Authentication-Micro-Service
A simple user authentication micro service

## Usage

Make sure the `.env` file is in the root directory of the server and has the following keys:

```bash
MYSQL_PASSWORD=password # change this if you want to use a different password
MYSQL_USER=user1 # change this if you want to use a different user
MYSQL_DATABASE=test_database # change this if you want to use a different database name

JWT_SECRET = # add your key here

# if you change these, you will also need to change the corresponding field in docker-compose.yml
DB_HOST=database
DB_PORT=3306
SERVER_PORT=3000
```

It's recommended to use a different password and user for production.

Then run the following commands:

```bash
docker compose up --build --force-recreate 
```

To remove all containers afterwards, run:

```bash
docker compose down
```

The server will be running on `localhost:<PORT>`.