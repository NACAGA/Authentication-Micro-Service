require('dotenv').config();

const env = process.env;

const db = {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.MARIADB_USER,
    password: env.MARIADB_PASSWORD,
    database: env.MARIADB_DATABASE,
};

module.exports = db;
