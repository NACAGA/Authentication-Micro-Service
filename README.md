# User Authentication

This microservice performs basic user authentication.

## Table of Contents

-   [NewServiceSetup](#new-service-repo-setup)
-   [Overview](#overview)
-   [Endpoints](#endpoints)
-   [Database](#database)
-   [Getting Started](#getting-started)
-   [Configuration](#configuration)
-   [Testing](#testing)

## New Service Repo Setup

### Duplicating the Repo

### Labels

In order to keep labels consitent across micro services, we will use the template available in the docs folder of this repo to auto populate
the new repo with labels. After running "npm install", run the following commands from the server directory:

```bash
    npx ghlbl -o NACAGA -r <name-of-new-repo> -t <organization-pat> -d
```

```bash
    npx ghlbl -o NACAGA -r <name-of-new-repo> -t <organization-pat> -i docs/labels.json
```

## Overview

Provide a high-level overview of the microservice, including its purpose, key features, and any important concepts.

## Endpoints

### Base URL

**URL**: `/user-authentication`

#### Create User

-   **URL**: `/create-user`
-   **Method**: `POST`
-   **Description**: Creates a user.
-   **Query Parameters**:

    | Parameter  | Type   | Description                                           |
    | ---------- | ------ | ----------------------------------------------------- |
    | `username` | String | The User's Username                                   |
    | `password` | String | The User's Password (this should be hashed when sent) |

-   **Example**:

    Request

    ```json
    {
        "headers": {},
        "body": {
            "username": "user1",
            "password": "password"
        }
    }
    ```

    Response

    ```json
    {
        "body": {
            "code": 201,
            "message": "User successfully created"
        }
    }
    ```

#### Login User

-   **URL**: `/login-user`
-   **Method**: `POST`
-   **Description**: Logs in a user.
-   **Query Parameters**:

    | Parameter  | Type   | Description                                           |
    | ---------- | ------ | ----------------------------------------------------- |
    | `username` | String | The User's Username                                   |
    | `password` | String | The User's Password (this should be hashed when sent) |

-   **Example**:

    Request

    ```json
    {
        "headers": {},
        "body": {
            "username": "user1",
            "password": "password"
        }
    }
    ```

    Response

    ```json
    {
        "body": {
            "code": 200,
            "message": "User successfully logged in",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsImV4cGlyYXRpb25EYXRlIjoiMjAyMy0xMi0yOVQwMTo0ODo1OS43NTlaIiwiaWF0IjoxNzAzODA3MzM5fQ.tVw4HvHm-xyKvNltM3XrHDYi2c7vecgLNr_UoO9Oz4o"
        }
    }
    ```

#### Change Username

-   **URL**: `/change-username`
-   **Method**: `PATCH`
-   **Description**: Changes a user's username.
-   **Query Parameters**:

    | Parameter      | Type   | Description                                                                                          |
    | -------------- | ------ | ---------------------------------------------------------------------------------------------------- |
    | `username`     | String | The User's current Username                                                                          |
    | `new_username` | String | The User's new Username                                                                              |
    | `token`        | String | The User's session token (user must be ACTIVE and have a valid session token for request to succeed) |

-   **Example**:

    Request

    ```json
    {
        "headers": {},
        "body": {
            "new_username": "user1",
            "username": "user2",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsImV4cGlyYXRpb25EYXRlIjoiMjAyMy0xMi0yOVQwMjoyMzozMi42NDNaIiwiaWF0IjoxNzAzODA5NDEyfQ.3Wm3ivdpyWUFryDFIZhsKxpwL_VPD5hgcThHmO1iWcg"
        }
    }
    ```

    Response

    ```json
    {
        "body": {
            "code": 200,
            "message": "Username changed successfully"
        }
    }
    ```

#### Change Password

-   **URL**: `/change-password`
-   **Method**: `PATCH`
-   **Description**: Changes a user's password.
-   **Query Parameters**:

    | Parameter      | Type   | Description                                                                                          |
    | -------------- | ------ | ---------------------------------------------------------------------------------------------------- |
    | `username`     | String | The User's Username                                                                                  |
    | `new_password` | String | The User's new Password                                                                              |
    | `token`        | String | The User's session token (user must be ACTIVE and have a valid session token for request to succeed) |

-   **Example**:

    Request

    ```json
    {
        "headers": {},
        "body": {
            "new_password": "123456",
            "username": "user1",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsImV4cGlyYXRpb25EYXRlIjoiMjAyMy0xMi0yOVQwMjoyMzozMi42NDNaIiwiaWF0IjoxNzAzODA5NDEyfQ.3Wm3ivdpyWUFryDFIZhsKxpwL_VPD5hgcThHmO1iWcg"
        }
    }
    ```

    Response

    ```json
    {
        "body": {
            "code": 200,
            "message": "Password changed successfully"
        }
    }
    ```

#### Change User Info

-   **URL**: `/change-user-info`
-   **Method**: `PATCH`
-   **Description**: Changes a user's basic info.
-   **Query Parameters**:

    | Parameter    | Type   | Description                                                                                                                                                                                   |
    | ------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `username`   | String | The User's Username                                                                                                                                                                           |
    | `new_fields` | Dict   | A dictionary containing key:value pairs where the key is the name of the db field and the value is the value for that field in the db **(password, username, and status are not valid keys)** |
    | `token`      | String | The User's session token (user must be ACTIVE and have a valid session token for request to succeed)                                                                                          |

-   **Example**:

    Request

    ```json
    {
        "headers": {},
        "body": {
            "new_fields": {
                "firstname": "John",
                "lastname": "Smith",
                "favoritecolor": "blue"
            },
            "username": "user1",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsImV4cGlyYXRpb25EYXRlIjoiMjAyMy0xMi0yOVQwMjoyMzozMi42NDNaIiwiaWF0IjoxNzAzODA5NDEyfQ.3Wm3ivdpyWUFryDFIZhsKxpwL_VPD5hgcThHmO1iWcg"
        }
    }
    ```

    Response

    ```json
    {
        "body": {
            "code": 200,
            "message": "User info changed successfully"
        }
    }
    ```

#### Logout User

-   **URL**: `/logout-user`
-   **Method**: `POST`
-   **Description**: Log a user out. This sets their session token to expired.
-   **Query Parameters**:

    | Parameter  | Type   | Description         |
    | ---------- | ------ | ------------------- |
    | `username` | String | The User's Username |

-   **Example**:

    Request

    ```json
    {
        "headers": {},
        "body": {
            "username": "user1"
        }
    }
    ```

    Response

    ```json
    {
        "body": {
            "code": 200,
            "message": "User successfully logged out"
        }
    }
    ```

#### Deactivate User

-   **URL**: `/deactivate-user`
-   **Method**: `POST`
-   **Description**: Deactivates a user. This sets their user to `INACTIVE`, pretty much deleting the user whilst keeping their info in the
    database. Inactive users cannot be set back to Active without direct access to the database. Their user record is also not considered in
    any username checking.
-   **Query Parameters**:

    | Parameter  | Type   | Description         |
    | ---------- | ------ | ------------------- |
    | `username` | String | The User's Username |

-   **Example**:

    Request

    ```json
    {
        "headers": {},
        "body": {
            "username": "user1"
        }
    }
    ```

    Response

    ```json
    {
        "body": {
            "code": 200,
            "message": "User successfully deactivated"
        }
    }
    ```

    #### Activate User

-   **URL**: `/activate-user`
-   **Method**: `POST`
-   **Description**: Activates a user. This request only works on Blocked or already Active users. If a user is Inactive they can only be
    reactivated through direct queries to the database.
-   **Query Parameters**:

    | Parameter  | Type   | Description         |
    | ---------- | ------ | ------------------- |
    | `username` | String | The User's Username |

-   **Example**:

    Request

    ```json
    {
        "headers": {},
        "body": {
            "username": "user1"
        }
    }
    ```

    Response

    ```json
    {
        "body": {
            "code": 200,
            "message": "User successfully activated"
        }
    }
    ```

#### Block User

-   **URL**: `/block-user`
-   **Method**: `POST`
-   **Description**: Blocks a user. This request can only be performed on Active or already blocked users. If a user is Inactive they can
    only be set to Blocked through direct queries to the database.
-   **Query Parameters**:

    | Parameter  | Type   | Description         |
    | ---------- | ------ | ------------------- |
    | `username` | String | The User's Username |

-   **Example**:

    Request

    ```json
    {
        "headers": {},
        "body": {
            "username": "user1"
        }
    }
    ```

    Response

    ```json
    {
        "body": {
            "code": 200,
            "message": "User successfully blocked"
        }
    }
    ```

#### Delete User

-   **URL**: `/delete-user`
-   **Method**: `DEL`
-   **Description**: Deletes a user. It is recommended that Deactivation of a user is used rather than deletion. Deactivation voids the
    user's username as taken, and completly stops the user from logging in. Deleting a user will permanently delete a user's info from the
    database, while deactivation will keep their info.
-   **Query Parameters**:

    | Parameter  | Type   | Description         |
    | ---------- | ------ | ------------------- |
    | `username` | String | The User's Username |

-   **Example**:

    Request

    ```json
    {
        "headers": {},
        "body": {
            "username": "user1"
        }
    }
    ```

    Response

    ```json
    {
        "body": {
            "code": 200,
            "message": "User successfully deleted"
        }
    }
    ```

#### Validate User Session

-   **URL**: `/validate-user-session`
-   **Method**: `POST`
-   **Description**: Validates a user's session. This is meant to be used as validation that a user is logged in for actions that the user
    attempts to perform that are outside the scope of the authentication service. If a user has a valid unexpired session token, a success
    will be returned.
-   **Query Parameters**:

    | Parameter  | Type   | Description                                                                                          |
    | ---------- | ------ | ---------------------------------------------------------------------------------------------------- |
    | `username` | String | The User's Username                                                                                  |
    | `token`    | String | The User's session token (user must be ACTIVE and have a valid session token for request to succeed) |

-   **Example**:

    Request

    ```json
    {
        "headers": {},
        "body": {
            "username": "user1",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjIsImV4cGlyYXRpb25EYXRlIjoiMjAyMy0xMi0yOVQwNDoxNDozNC4zOTBaIiwiaWF0IjoxNzAzODE2MDc0fQ.UEH4UgI-kAYmdwsASZytfxoJzJYt0ESFsEVPQoa2PGo"
        }
    }
    ```

    Response

    ```json
    {
        "body": {
            "code": 200,
            "message": "User session is valid"
        }
    }
    ```

#### Get Users

-   **URL**: `/get-users`
-   **Method**: `GET`
-   **Description**: Gets all of the requested fields for each Active or Blocked user in the database. Will not retrieve password.
-   **Query Parameters**:

    | Parameter | Type | Description                                                      |
    | --------- | ---- | ---------------------------------------------------------------- |
    | `fields`  | List | A list of the database fields you want to retrieve for each user |

-   **Example**:

    Request

    ```json
    {
        "headers": {},
        "body": {
            "fields": ["username", "status", "firstname", "lastname"]
        }
    }
    ```

    Response

    ```json
    {
        "body": {
            "code": 200,
            "message": "Users successfully retrieved",
            "users": [
                {
                    "username": "user1",
                    "status": "ACTIVE",
                    "firstname": "John",
                    "lastname": "Smith"
                },
                {
                    "username": "user2",
                    "status": "ACTIVE",
                    "firstname": "NULL",
                    "lastname": "NULL"
                },
                {
                    "username": "user3",
                    "status": "BLOCKED",
                    "firstname": "Jim",
                    "lastname": "NULL"
                }
            ]
        }
    }
    ```

#### Get User Info

-   **URL**: `/get-user-info`
-   **Method**: `GET`
-   **Description**: Gets all of the info in the database for a specified user. Does not retrieve password.
-   **Query Parameters**:

    | Parameter  | Type   | Description         |
    | ---------- | ------ | ------------------- |
    | `username` | String | The User's Username |

-   **Example**:

    Request

    ```json
    {
        "headers": {},
        "body": {
            "username": "user1"
        }
    }
    ```

    Response

    ```json
    {
        "body": {
            "code": 200,
            "message": "Users successfully retrieved",
            "user": {
                "id": 1,
                "username": "user1",
                "status": "ACTIVE",
                "firstname": "John",
                "lastname": "Smith",
                "phone": "NULL",
                "favoritecolor": "blue"
            }
        }
    }
    ```

## Database

### Database Type

The microservice uses a relational database system, specifically MariaDB.

### Database Schema

The following tables constitute the database schema: ![Alt text](docs/dbschema.png)

#### Users Table

Stores information about users.

| Column          | Type    | Description                  |
| --------------- | ------- | ---------------------------- |
| `id`            | INT     | Unique user identifier       |
| `username`      | VARCHAR | User's username              |
| `password`      | VARCHAR | User's password              |
| `status`        | VARCHAR | BLOCKED, ACTIVE, or DEACTIVE |
| `firstname`     | VARCHAR | User's first name            |
| `lastname`      | VARCHAR | User's last name             |
| `phone`         | VARCHAR | User's phone number          |
| `favoritecolor` | VARCHAR | User's favorite color        |

#### User Sessions Table

Stores user sessions and jw tokens.

| Column       | Type     | Description                           |
| ------------ | -------- | ------------------------------------- |
| `id`         | INT      | Unique session identifier             |
| `userid`     | INT      | Foreign Key session owner's id        |
| `token`      | VARCHAR  | jwt session token                     |
| `expiration` | DATETIME | Expiration date of the user's session |

### Relationships

-   The `UserSessions` table has a foreign key (`userid`) referencing the `Users` table's `id`.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following prerequisites installed:

-   [Node.js](https://nodejs.org/) (version X.X.X or higher)
-   [npm](https://www.npmjs.com/) (version X.X.X or higher)
-   [MySQL](https://www.mysql.com/) (if using a MySQL database)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/NACAGA/Authentication-Micro-Service.git
    ```

2. Change into the project directory:

    ```bash
    cd <Authentication-Micro-Service>
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

### Environment Variables

Make sure to include a `.env` file in the root directory of the project (Same directory as this README). The following environment variables
should be present:

```env
MYSQL_PASSWORD=password # change this if you want to use a different password
MYSQL_USER=user1 # change this if you want to use a different user
MYSQL_DATABASE=test_database # change this if you want to use a different database name
MYSQL_ROOT_PASSWORD=root_password # change this if you want to use a different root password

DB_PORT=3306 # default mysql port
SERVER_PORT=3000 # change this if you want to use a different port

JWT_SECRET = # add your key here

# do not change this
DB_HOST=database # database is the name of the database container
```

Adjust the values based on your specific configuration.

### Running the Microservice

To run the service locally on your machine, run the following command inside of the server directory.

```bash
npm start
```

To run the service in Docker containers the following command from the base directory:

```bash
docker compose up --build --force-recreate
```

To remove all containers afterwards, run:

```bash
docker compose down
```

## Testing

Provide instructions on how to perform tests from the test suite here.

npm start

````

To spin up the microservice in a local docker container, follow these steps:

1. Run this command in the server directory
    ```bash
    docker ...
    ```

## Testing

Provide instructions on how to perform tests from the test suite here.
````
