const db = require('./db.service');

async function changeUsername(user) {
    let message = 'Error changing username: ';

    // Check if username is already taken
    const userNameTaken = await db.query(`SELECT * FROM Users WHERE username = ?`, [user.newname]);
    if (userNameTaken.length) {
        message += 'Username is already taken';
        return message;
    }

    const result = await db.query(`UPDATE Users SET username = ? WHERE username = ? AND password = ?`, [user.newname, user.username, user.password]);
    console.log(result);
    if (result.affectedRows) {
        message = 'Username successfully changed';
    } else {
        message += 'Username could not be changed';
    }

    return message;
}

module.exports = { changeUsername };
