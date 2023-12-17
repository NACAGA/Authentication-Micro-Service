const db = require('./db.service');
const userSession = require('./userSession.service');
const Error = require('./domain/buisnessErrror.domain');
const Success = require('./domain/success.domain');

class UsernameChangedSuccess extends Success {
    constructor() {
        super();
        this.code = 200;
        this.message = 'Username changed successfully';
    }
}

async function changeUsername(user) {
    const userExists = await db.query(`SELECT * FROM Users WHERE username = ?`, [user.username]);
    if (!userExists.length) {
        return new Error.UserDoesNotExist();
    }

    // Validate user session
    const validUserSession = await userSession.validateUserSession(user.sessionToken, user.username);
    if (!validUserSession) {
        return new Error.UserNotLoggedIn();
    }

    // Check if username is already taken
    const userNameTaken = await db.query(`SELECT * FROM Users WHERE username = ?`, [user.new_username]);
    if (userNameTaken.length) {
        return new Error.UsernameTakenError();
    }

    const result = await db.query(`UPDATE Users SET username = ? WHERE username = ?`, [user.new_username, user.username]);

    if (result.affectedRows) {
        await userSession.updateUserSession(user.sessionToken);
        return new UsernameChangedSuccess();
    }

    return new Error.ChangeUsernameError();
}

module.exports = { changeUsername, UsernameChangedSuccess };
