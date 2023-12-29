const db = require('./db.service');
const userManager = require('./userManager.service');
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
    const validateUserSessionResult = await userManager.validateUserSession(user.sessionToken, user.username);
    if (validateUserSessionResult instanceof Error.BusinessError) return validateUserSessionResult;

    const changePasswordResult = await db.query(`UPDATE Users SET password = ? WHERE username = ?`, [user.new_password, user.username]);
    if (changePasswordResult instanceof Error.BusinessError) return changePasswordResult;
    if (changePasswordResult.result.affectedRows > 0) {
        const updateSessionResult = await userManager.updateUserSession(user.sessionToken);
        if (updateSessionResult instanceof Error.BusinessError) return updateSessionResult;

        return new PasswordChangedSuccess();
    }

    return new Error.ChangePasswordError();
}

module.exports = { changePassword, PasswordChangedSuccess };
