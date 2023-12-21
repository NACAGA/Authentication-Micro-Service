# server

## Usage

Make sure the `.env` file is in the root directory of the server and has the following contents:

```bash
MYSQL_PASSWORD=password
DB_HOST=localhost
DB_PORT=3306
MYSQL_USER=user1
MYSQL_DATABASE=test_database
```

Then run the following commands:

```bash
npm install
npm start
```

You can also run `npm run dev` to run the server in development mode. This will automatically restart the server when you make changes to the code.

## Testing

I'm using postman to test. For example, to test the `POST /user-authentication/create-user` endpoint, I would send a post request to `localhost:3000/user-authentication/create-user` with the following **body**:

```json
{
    "username": "test",
    "password": "test"
}
```

You can load in the postman collection from the `postman` directory.

## Endpoints

fill in a table here