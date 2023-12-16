const db = require('./db.service');
const userSession = require('./userSession.service');

async function loginUser(user) {
    const result = await db.query(`SELECT * FROM Users WHERE username = ?`, [user.username]);

    let response = {
        code: 401,
        message: 'Error logging in a user: username or password is incorrect',
    };

    if (result.length) {
        userSession.createUserSession(result[0].id);
        response.code = 200;
        response.message = 'User successfully logged in';
    }

    return response;
}

module.exports = { loginUser };
