require('dotenv').config();

const env = process.env;

const db = {
    host: env.DB_HOST,
    port: env.DB_PORT || 3306,
    user: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
};

module.exports = db;
