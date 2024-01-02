const mysql = require('mysql2/promise');
const mysql2 = require('mysql2');
const dbConfig = require('../configs/db.config');
const Success = require('./domain/success.domain');
const Error = require('./domain/buisnessErrror.domain');
const { get } = require('../routes/userAuthentication.route');

class QuerySuccess extends Success {
    constructor(result) {
        super();
        this.code = 200;
        this.message = 'Query successful';
        this.result = result;
    }
}

let connection;

async function getConnection() {
    try {
        if (!connection) { // if connection is not provided, create a new one
            connection = await mysql.createConnection(dbConfig);
        }
        return connection;
    } catch (err) {
        return new Error.DatabaseError(err);
    }
}

async function closeConnection() {
    try {
        await connection.end();
    } catch (err) {
        return new Error.DatabaseError(err);
    }
}

async function query(sql, params) {
    try {
        connection = await getConnection();
        const [rows] = await connection.execute(sql, params);
        return new QuerySuccess(rows);
    } catch (err) {
        console.log(err);
        return new Error.DatabaseError(err);
    }
}

module.exports = {
    query,
    QuerySuccess,
    getConnection,
    closeConnection,
};
