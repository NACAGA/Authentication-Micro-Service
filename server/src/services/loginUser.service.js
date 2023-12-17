const db = require('./db.service');
const userSession = require('./userSession.service');
const Error = require('./domain/buisnessErrror.domain');
const Success = require('./domain/success.domain');
class UserLoginSuccess extends Success {
    constructor(sessionToken) {
        super();
        this.code = 200;
        this.message = 'User successfully logged in';
        this.sessionToken = sessionToken;
    }
}

async function loginUser(user) {
    const userExists = await db.query(`SELECT * FROM Users WHERE username = ?`, [user.username]);
    if (!userExists.length) {
        return new Error.UserDoesNotExist();
    }

    const result = await db.query(`SELECT * FROM Users WHERE username = ? AND password = ?`, [user.username, user.password]);

    if (result.length) {
        const sessionCreationResult = await userSession.createUserSession(result[0].id);
        if (sessionCreationResult instanceof Success) {
            return new UserLoginSuccess(sessionCreationResult.sessionToken);
        }
        return sessionCreationResult;
    }

    return new Error.InvalidUsernameOrPassowrd();
}

module.exports = { loginUser };
