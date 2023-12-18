# Authentication-Micro-Service
A simple user authentication micro service

## Usage

Make sure the `.env` file is in the root directory of the server and has the following contents:

```bash
MYSQL_PASSWORD=password # change this if you want to use a different password
DB_PORT=3306 # change this if you want to run the database on a different port
MYSQL_USER=user1 # change this if you want to use a different user
MYSQL_DATABASE=test_database # change this if you want to use a different database name
PORT=3000 # change this if you want to run the server on a different port
JWT_SECRET= # add your key here
DB_HOST=database # DON'T CHANGE THIS
```

Then run the following commands:

```bash
docker compose up --build --abort-on-container-exit
```

The server will be running on `localhost:<PORT>`.