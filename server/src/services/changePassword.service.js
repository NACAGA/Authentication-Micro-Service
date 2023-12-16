const db = require('./db.service');

async function changePassword(user) {
    let response = {
        code: 500,
        message: 'Error changing password: ',
    };

    const result = await db.query(`UPDATE Users SET password = ? WHERE username = ? AND password = ?`, [
        user.new_password,
        user.username,
        user.password,
    ]);
    console.log(result);
    if (result.affectedRows) {
        response.code = 200;
        response.message = 'Password successfully changed';
    } else {
        response.code = 401;
        response.message = 'Password could not be changed';
    }

    return response;
}

module.exports = { changePassword };
