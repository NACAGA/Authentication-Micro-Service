const db = require('./db.service');
const Success = require('./domain/success.domain');
const Error = require('./domain/buisnessErrror.domain');
const authManager = require('./authenticationManager.service');
const { status } = require('../configs/general.config');

class BlockUserSuccess extends Success {
    constructor() {
        super();
        this.code = 200;
        this.message = 'User successfully blocked';
    }
}

async function blockUser(user) {
    const validateUserExistsResult = await authManager.validateUserExists(user.id);
    if (validateUserExistsResult instanceof Error.BusinessError) return validateUserExistsResult;

    const blockUserResult = await db.query(`UPDATE Users SET status = ? WHERE id = ?`, [status.blocked, validateUserExistsResult.userid]); // Set the user's status to active
    if (blockUserResult instanceof Error.BusinessError) return blockUserResult;
    if (blockUserResult.result.affectedRows > 0) return new BlockUserSuccess(); // User activated successfully

    return new Error.BlockUserError(); // Error occured while activating user
}

module.exports = {
    blockUser,
};
