# Microservice Name

A brief description of what the microservice does.

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

#### Endpoint 1

-   **URL**: `/endpoint1`
-   **Method**: `GET`
-   **Description**: Description of what this endpoint does.
-   **Query Parameters**:

    | Parameter | Type   | Description           |
    | --------- | ------ | --------------------- |
    | `param1`  | String | Description of param1 |
    | `param2`  | Number | Description of param2 |

-   **Example**:

    Request

    ```json
    {
        "headers": {},
        "body": {
            "body-element-1": "element-1"
        }
    }
    ```

    ```json
    {
        "result": {
            "response-element-1": "example response"
        }
    }
    ```

## Database

### Setup

Run the following commands:

```bash
docker compose up --build --force-recreate
```

To remove all containers afterwards, run:

```bash
docker compose down
```

The server will be running on localhost:<PORT>.

### Database Type

The microservice uses a relational database system, specifically MySQL.

### Database Schema

The following tables constitute the database schema:

#### Users Table

Stores information about users.

| Column       | Type     | Description                    |
| ------------ | -------- | ------------------------------ |
| `id`         | INT      | Unique user identifier         |
| `username`   | VARCHAR  | User's username                |
| `email`      | VARCHAR  | User's email address           |
| `created_at` | DATETIME | Date and time of user creation |

### Relationships

-   The `Posts` table has a foreign key (`user_id`) referencing the `Users` table's `id`.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following prerequisites installed:

-   [Node.js](https://nodejs.org/) (version X.X.X or higher)
-   [npm](https://www.npmjs.com/) (version X.X.X or higher)
-   [MySQL](https://www.mysql.com/) (if using a MySQL database)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/NACAGA/<new-microservice>.git
    ```

2. Change into the project directory:

    ```bash
    cd <new-microservice>
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
PORT=3000 # change this if you want to run the server on a different port
JWT_SECRET= # add your key here
DB_HOST=database # DON'T CHANGE THIS
```

Adjust the values based on your specific configuration.

### Running the Microservice

To run the service locally on your machine, run the following command inside of the server directory.

```bash
npm start
```

To spin up the microservice in a local docker container, follow these steps:

1. Run this command in the server directory
    ```bash
    docker ...
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
