const db = require('./db.service');
const authManager = require('./authenticationManager.service');
const Error = require('./domain/buisnessErrror.domain');
const Success = require('./domain/success.domain');

class PasswordChangedSuccess extends Success {
    constructor(userid, username) {
        super();
        this.code = 200;
        this.message = 'Password changed successfully';
        this.userid = userid;
        this.username = username;
    }
}

async function changePassword(user) {
    const validateUserSessionResult = await authManager.validateUserSession(user.token);
    if (validateUserSessionResult instanceof Error.BusinessError) return validateUserSessionResult;

    const changePasswordResult = await db.query(`UPDATE Users SET password = ? WHERE id = ?`, [user.new_password, user.id]);
    if (changePasswordResult instanceof Error.BusinessError) return changePasswordResult;
    if (changePasswordResult.result.affectedRows > 0)
        return new PasswordChangedSuccess(validateUserSessionResult.userid, validateUserSessionResult.username);

    return new Error.ChangePasswordError();
}

module.exports = { changePassword, PasswordChangedSuccess };
