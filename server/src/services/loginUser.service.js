const db = require('./db.service');
const userSession = require('./userSession.service');
const Error = require('./domain/buisnessErrror.domain');

class UserLoginSuccess extends Success {
    constructor() {
        this.code = 200;
        this.message = 'User successfully logged in';
    }
}

async function loginUser(user) {
    const result = await db.query(`SELECT * FROM Users WHERE username = ?`, [user.username]);

    if (result.length) {
        userSession.createUserSession(result[0].id);
        return new UserLoginSuccess();
    }

    return new Error.InvalidUsernameOrPassowrd();
}

module.exports = { loginUser };
