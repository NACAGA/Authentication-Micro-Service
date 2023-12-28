const mysql = require('mysql2/promise');
const dbConfig = require('../configs/db.config');
const utils = require('../utils/userAuthentication.util');
const Success = require('./domain/success.domain');
const Error = require('./domain/buisnessErrror.domain');

class QuerySuccess extends Success {
    constructor(result) {
        super();
        this.code = 200;
        this.message = 'Query successful';
        this.result = result;
    }
}

async function query(sql, params) {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(sql, params);
    return new QuerySuccess(rows);
}

module.exports = {
    query,
    QuerySuccess,
};
