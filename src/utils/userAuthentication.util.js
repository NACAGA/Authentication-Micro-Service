// util file
const regex = /^[a-zA-Z0-9\-_\.]+$/;

function verifySqlInput(values) {
    let validValues = false;
    for (const value of values) {
        if (regex.test(value)) {
            // Returns true if value contains alphanumeric, underscore, period, hyphen, or period and nothing else
            validValues = true;
        }
    }
    return validValues;
}

function buildEditUserInfoQuery(fields, username) {
    const query = `Update Users SET `;
    const values = [];
    for (const field in fields) {
        if (field === 'password' || field === 'username') continue;
        if (verifySqlInput(fields[field]) || verifySqlInput(field)) continue;
        query += `${field} = ?, `;
        values.push(fields[field]);
    }
    query = query.slice(0, -2);
    query += ` WHERE username = ?`;
    values.push(username);
    return { query, values };
}

module.exports = { buildEditUserInfoQuery, verifySqlInput };
