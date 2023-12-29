const db = require('./db.service');
const Error = require('./domain/buisnessErrror.domain');
const Success = require('./domain/success.domain');
const userManager = require('./authenticationManager.service');

class UserDeletedSuccess extends Success {
    constructor() {
        super();
        this.code = 200;
        this.message = 'User successfully deleted';
    }
}

async function deleteUser(user) {
    const validateUserExistsResult = await userManager.validateUserExists(user.username);
    if (validateUserExistsResult instanceof Error.BusinessError) return validateUserExistsResult;

    const deleteUserResult = await db.query(`DELETE FROM Users WHERE username = ?`, [user.username]);
    if (deleteUserResult instanceof Error.BusinessError) return deleteUserResult;
    if (deleteUserResult.result.affectedRows > 0) return new UserDeletedSuccess(); // User deleted successfully

    return new Error.DeleteUserError(); // Error occured while deleting user
}

module.exports = {
    deleteUser,
};
