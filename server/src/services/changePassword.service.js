const db = require('./db.service');
const userSession = require('./userSession.service');

async function changePassword(user) {
    let response = {
        code: 500,
        message: 'Error changing password: ',
    };

    const validUserSession = await userSession.validateUserSession(user.sessionToken);
    if (validUserSession) {
        response.code = 401;
        response.message += 'User is not logged in';
        return response;
    }

    const result = await db.query(`UPDATE Users SET password = ? WHERE username = ? AND password = ?`, [
        user.new_password,
        user.username,
        user.password,
    ]);

    if (result.length) {
        response.code = 200;
        response.message = 'Password changed successfully';
        await userSession.updateUserSession(user.sessionToken);
    } else {
        response.message += 'Invalid username or password';
    }

    return response;
}

module.exports = { changePassword };
