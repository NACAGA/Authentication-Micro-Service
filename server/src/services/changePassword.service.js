const db = require('./db.service');
const userSession = require('./userSession.service');
const Error = require('./domain/buisnessErrror.domain');
const Success = require('./domain/success.domain');

class PasswordChangedSuccess extends Success {
    constructor() {
        this.code = 200;
        this.message = 'Password changed successfully';
    }
}

async function changePassword(user) {
    const validUserSession = await userSession.validateUserSession(user.sessionToken);
    if (validUserSession) {
        return new Error.UserNotLoggedIn();
    }

    const result = await db.query(`UPDATE Users SET password = ? WHERE username = ? AND password = ?`, [
        user.new_password,
        user.username,
        user.password,
    ]);

    if (result.length) {
        await userSession.updateUserSession(user.sessionToken);
        return new PasswordChangedSuccess();
    } else {
        return new Error.InvalidUsernameOrPassowrd();
    }
}

module.exports = { changePassword, PasswordChangedSuccess };
