const mysql = require('mysql2/promise');
const dbConfig = require('../configs/db.config');

async function query(sql, params) {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(sql, params);
    return rows;
}

module.exports = {
    query,
};
