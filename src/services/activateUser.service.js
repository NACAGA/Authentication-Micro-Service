const db = require('./db.service');
const Success = require('./domain/success.domain');
const Error = require('./domain/buisnessErrror.domain');
const authManager = require('./authenticationManager.service');
const { status } = require('../configs/general.config');

class ActivateUserSuccess extends Success {
    constructor() {
        super();
        this.code = 200;
        this.message = 'User successfully activated';
    }
}

async function activateUser(user) {
    const validateUserExistsResult = await authManager.validateUserExists(user.id);
    if (validateUserExistsResult instanceof Error.BusinessError) return validateUserExistsResult;

    const activateUserResult = await db.query(`UPDATE Users SET status = ? WHERE id = ?`, [status.active, validateUserExistsResult.userid]); // Set the user's status to active
    if (activateUserResult instanceof Error.BusinessError) return activateUserResult;
    if (activateUserResult.result.affectedRows > 0) return new ActivateUserSuccess(); // User activated successfully
    return new Error.ActivateUserError(); // Error occured while activating user
}

module.exports = {
    activateUser,
};
