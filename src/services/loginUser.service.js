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
    switch (true) {
        case userExists instanceof Error.BusinessError:
            return userExists; // Error occured while querying the database
        case userExists.result.length > 0:
            const loginUserResult = await db.query(`SELECT * FROM Users WHERE username = ? AND password = ?`, [
                user.username,
                user.password,
            ]);
            switch (true) {
                case loginUserResult instanceof Error.BusinessError:
                    return loginUserResult; // Error occured while querying the database
                case loginUserResult.result.length > 0:
                    // User exists and password is correct
                    const sessionCreationResult = await userSession.createUserSession(loginUserResult.result[0].id);
                    switch (true) {
                        case sessionCreationResult instanceof Error.BusinessError:
                            return sessionCreationResult; // Error occured while creating user session
                        default: // User session created successfully
                            return new UserLoginSuccess(sessionCreationResult.sessionToken);
                    }
                default:
                    return new Error.InvalidUsernameOrPassowrd(); // Password is incorrect
            }
        default:
            return new Error.UserDoesNotExist();
    }
}

module.exports = { loginUser };
