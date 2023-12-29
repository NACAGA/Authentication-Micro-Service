// util file

function buildEditUserInfoQuery(fields, username) {
    let query = `Update Users SET `;
    let values = [];
    for (const field in fields) {
        if (field === 'password' || field === 'username' || field === 'status') continue;
        query += `${field} = ?, `;
        values.push(fields[field]);
    }
    query = query.slice(0, -2);
    query += ` WHERE username = ?`;
    values.push(username);
    return { query, values };
}

module.exports = { buildEditUserInfoQuery };
