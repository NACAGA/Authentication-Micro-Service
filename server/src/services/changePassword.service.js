const db = require('./db.service');
const userSession = require('./userSession.service');
const Error = require('./domain/buisnessErrror.domain');
const Success = require('./domain/success.domain');

class PasswordChangedSuccess extends Success {
    constructor() {
        super();
        this.code = 200;
        this.message = 'Password changed successfully';
    }
}

async function changePassword(user) {
    const userExists = await db.query(`SELECT * FROM Users WHERE username = ?`, [user.username]);
    if (!userExists.length) {
        return new Error.UserDoesNotExist();
    }

    const validUserSession = await userSession.validateUserSession(user.sessionToken, user.username);
    if (!validUserSession) {
        return new Error.UserNotLoggedIn();
    }

    const result = await db.query(`UPDATE Users SET password = ? WHERE username = ?`, [user.new_password, user.username]);

    if (result.affectedRows) {
        await userSession.updateUserSession(user.sessionToken);
        return new PasswordChangedSuccess();
    }

    return new Error.ChangePasswordError();
}

module.exports = { changePassword, PasswordChangedSuccess };
