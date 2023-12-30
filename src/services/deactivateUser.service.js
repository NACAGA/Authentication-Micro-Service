const db = require('./db.service');
const Success = require('./domain/success.domain');
const Error = require('./domain/buisnessErrror.domain');
const authManager = require('./authenticationManager.service');
const { status } = require('../configs/general.config');

class DeactivateUserSuccess extends Success {
    constructor(userid, username) {
        super();
        this.code = 200;
        this.message = 'User successfully deactivated';
        this.userid = userid;
        this.username = username;
    }
}

async function deactivateUser(user) {
    const validateUserExistsResult = await authManager.validateUserExists(user.id);
    if (validateUserExistsResult instanceof Error.BusinessError) return validateUserExistsResult;

    const deactivateUserResult = await db.query(`UPDATE Users SET status = ? WHERE id = ?`, [
        status.deactive,
        validateUserExistsResult.userid,
    ]); // Set the user's status to active
    if (deactivateUserResult instanceof Error.BusinessError) return deactivateUserResult;
    if (deactivateUserResult.result.affectedRows > 0)
        return new DeactivateUserSuccess(validateUserExistsResult.userid, validateUserExistsResult.username); // User activated successfully

    return new Error.DeactivateUserError(); // Error occured while activating user
}

module.exports = {
    deactivateUser,
};
