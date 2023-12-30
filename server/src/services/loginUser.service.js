const db = require('./db.service');
const userSession = require('./userSession.service');
const Error = require('./domain/buisnessErrror.domain');
const Success = require('./domain/success.domain');
const { status } = require('../configs/general.config');
class UserLoginSuccess extends Success {
    constructor(token) {
        super();
        this.code = 200;
        this.message = 'User successfully logged in';
        this.token = token;
    }
}

async function loginUser(user) {
    const loginUserResult = await db.query(`SELECT * FROM Users WHERE username = ? AND password = ? AND status = ?`, [
        user.username,
        user.password,
        status.active,
    ]);
    switch (true) {
        case loginUserResult.result.length > 0:
            // User exists and password is correct
            const sessionCreationResult = await userSession.createUserSession(loginUserResult.result[0].id);
            switch (true) {
                case sessionCreationResult instanceof Error.BusinessError:
                    return sessionCreationResult; // Error occured while creating user session
                default: // User session created successfully
                    return new UserLoginSuccess(sessionCreationResult.token);
            }
        default:
            return new Error.InvalidUsernameOrPassowrd(); // Username or Password is incorrect
    }
}

module.exports = { loginUser };
