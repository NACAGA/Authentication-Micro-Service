const db = require('./db.service');

async function changePassword(user) {
    let message = 'Error changing password: ';

    const result = await db.query(`UPDATE Users SET password = ? WHERE username = ? AND password = ?`, [user.new_password, user.username, user.password]);
    console.log(result);
    if (result.affectedRows) {
        message = 'Password successfully changed';
    } else {
        message += 'Password could not be changed';
    }

    return message;
}

module.exports = { changePassword };
