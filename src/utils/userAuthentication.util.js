function buildEditUserInfoQuery(fields, username, tableColumns) {
    let query = `Update Users SET `;
    let values = [];
    console.log(tableColumns);
    for (const field in fields) {
        if (!tableColumns.includes(field)) continue;
        query += `${field} = ?, `;
        values.push(fields[field]);
    }
    query = query.slice(0, -2);
    query += ` WHERE username = ?`;
    values.push(username);
    return { query, values };
}

module.exports = { buildEditUserInfoQuery };
