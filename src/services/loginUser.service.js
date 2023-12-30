const db = require('./db.service');
const userSession = require('./authenticationManager.service');
const Error = require('./domain/buisnessErrror.domain');
const Success = require('./domain/success.domain');
const { status } = require('../configs/general.config');
class UserLoginSuccess extends Success {
    constructor(token, userid, username) {
        super();
        this.code = 200;
        this.message = 'User successfully logged in';
        this.token = token;
        this.userid = userid;
        this.username = username;
    }
}

async function loginUser(user) {
    const loginUserResult = await db.query(`SELECT * FROM Users WHERE username = ? AND password = ? AND status = ?`, [
        user.username,
        user.password,
        status.active,
    ]);
    if (loginUserResult instanceof Error.BusinessError) return loginUserResult; // Error occured while logging in user
    if (loginUserResult.result.length > 0) {
        const sessionCreationResult = await userSession.createUserSession(loginUserResult.result[0].id);
        if (sessionCreationResult instanceof Error.BusinessError) return sessionCreationResult; // Error occured while creating user session
        return new UserLoginSuccess(sessionCreationResult.token, sessionCreationResult.userid, user.username); // User session created successfully
    }
    return new Error.InvalidUsernameOrPassowrd(); // Username or Password is incorrect
}

module.exports = { loginUser };
