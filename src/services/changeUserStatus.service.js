const db = require('./db.service');
const Error = require('./domain/buisnessErrror.domain');
const Success = require('./domain/success.domain');
const userManager = require('./userManager.service');

class ChangeUserStatusSuccess extends Success {
    constructor() {
        super();
        this.code = 200;
        this.message = 'User status successfully changed';
    }
}

async function changeUserStatus(user) {
    const validateUserExistsResult = await userManager.validateUserExists(user.username);
    if (validateUserExistsResult instanceof Error.BusinessError) return validateUserExistsResult;

    const changeUserStatusResult = await db.query(`UPDATE Users SET status = ? WHERE username = ?`, [user.new_status, user.username]);
    if (changeUserStatusResult instanceof Error.BusinessError) return changeUserStatusResult;
    if (changeUserStatusResult.result.affectedRows > 0) return new ChangeUserStatusSuccess(); // User status changed successfully

    return new Error.ChangeUserStatusError(); // Error occured while deactivating user
}

module.exports = { changeUserStatus };
