const db = require('./db.service');

async function changeUsername(user) {
    let response = {
        code: 500,
        message: 'Error changing username: ',
    };

    // Check if username is already taken
    const userNameTaken = await db.query(`SELECT * FROM Users WHERE username = ?`, [user.new_username]);
    if (userNameTaken.length) {
        response.message += 'Username is already taken';
        return response;
    }

    const result = await db.query(`UPDATE Users SET username = ? WHERE username = ? AND password = ?`, [
        user.new_username,
        user.username,
        user.password,
    ]);

    if (result.affectedRows) {
        response.code = 200;
        response.message = 'Username successfully changed';
    } else {
        response.code = 401;
        response.message += 'Username could not be changed';
    }

    return response;
}

module.exports = { changeUsername };
