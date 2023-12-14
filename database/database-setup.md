# Database Setup

To build the database in a docker container simply run `docker build -t mydatabase-image .` inside of the database directory. Once you have
built the database, you can run it with `docker run -d -p 3306:3306 --name test_database-container mydatabase-image`. This runs it on port
3306 but you can change that if you would like.

## Accessing the Database

To view the database, install a database manager application such as DBeaver https://dbeaver.io/download/. Once installed you can connect to
the database by clicking on "Connect to Database" and then filling out the required fields.

-   Server Host: localhost
-   Port: 3306(or which ever port you chose)
-   Database: test_database
-   Username: user1
-   Password: password

Then click Finish. You should now have a connection to the test database established.
