const { status } = require('../configs/general.config');
const db = require('./db.service');
const Error = require('./domain/buisnessErrror.domain');
const Success = require('./domain/success.domain');
const userManager = require('./authenticationManager.service');

class UserLoggedOutSuccess extends Success {
    constructor() {
        super();
        this.code = 200;
        this.message = 'User successfully logged out';
    }
}

async function logoutUser(user) {
    const validateUserExistsResult = await userManager.validateUserExists(user.username);
    if (validateUserExistsResult instanceof Error.BusinessError) return validateUserExistsResult;

    const userid = validateUserExistsResult.userid;
    const nullDate = new Date(0);
    const logoutUserResult = await db.query(`UPDATE UserSessions SET expiration = ? WHERE userid = ?`, [nullDate, userid]);
    if (logoutUserResult instanceof Error.BusinessError) return logoutUserResult;
    if (logoutUserResult.result.affectedRows > 0) return new UserLoggedOutSuccess();
    return new Error.LogoutUserError(); // Error occured while logging out user
}

module.exports = { logoutUser };
