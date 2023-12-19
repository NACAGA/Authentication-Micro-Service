const utils = require('../utils/userAuthentication.util');
const db = require('./db.service');
const Error = require('./domain/buisnessErrror.domain');
const Success = require('./domain/success.domain');

class ChangeUserInfoSuccess extends Success {
    constructor() {
        super();
        this.code = 200;
        this.message = 'User info changed successfully';
    }
}

async function changeUserInfo(user) {
    const userExists = await db.query(`SELECT * FROM Users WHERE username = ?`, [user.username]);
    if (!userExists.length) {
        return new Error.UserDoesNotExist();
    }

    // Validate user session
    const validUserSession = await utils.validateUserSession(user.sessionToken, user.username);
    if (!validUserSession) {
        return new Error.UserNotLoggedIn();
    }

    const { query, values } = utils.buildEditUserInfoQuery(user.new_fields, user.username);
    const result = await db.query(query, values);

    if (result.affectedRows) {
        await utils.updateUserSession(user.sessionToken);
        return new ChangeUserInfoSuccess();
    }

    return new Error.ChangeUserInfoError();
}

module.exports = { changeUserInfo };
