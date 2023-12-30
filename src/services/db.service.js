const mysql = require('mysql2/promise');
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

async function getConnection() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        return connection;
    } catch (err) {
        return new Error.DatabaseError(err);
    }
}

async function closeConnection(connection) {
    try {
        await connection.end();
    } catch (err) {
        return new Error.DatabaseError(err);
    }
}

async function query(sql, params, connection) {
    if (!connection) { // if connection is not provided, create a new one
        connection = await getConnection();
    }
    try {
        const [rows] = await connection.execute(sql, params);
        return new QuerySuccess(rows);
    } catch (err) {
        return new Error.DatabaseError(err);
    }
}

module.exports = {
    query,
    QuerySuccess,
    getConnection,
    closeConnection,
};
