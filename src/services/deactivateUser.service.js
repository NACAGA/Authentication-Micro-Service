const db = require('./db.service');
const Success = require('./domain/success.domain');
const Error = require('./domain/buisnessErrror.domain');
const authManager = require('./authenticationManager.service');
const { status } = require('../configs/general.config');
const logoutUserService = require('./logoutUser.service');

class DeactivateUserSuccess extends Success {
    constructor() {
        super();
        this.code = 200;
        this.message = 'User successfully deactivated';
    }
}

async function deactivateUser(user) {
    const validateUserExistsResult = await authManager.validateUserExists(user.username);
    if (validateUserExistsResult instanceof Error.BusinessError) return validateUserExistsResult;

    const deactivateUserResult = await db.query(`UPDATE Users SET status = ? WHERE id = ?`, [
        status.deactive,
        validateUserExistsResult.userid,
    ]); // Set the user's status to active
    if (deactivateUserResult instanceof Error.BusinessError) return deactivateUserResult;
    if (deactivateUserResult.result.affectedRows > 0) {
        logoutUserService.logoutUser(user);
        return new DeactivateUserSuccess();
    } // User activated successfully

    return new Error.DeactivateUserError(); // Error occured while activating user
}

module.exports = {
    deactivateUser,
};
