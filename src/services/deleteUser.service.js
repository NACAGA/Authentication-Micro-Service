const db = require('./db.service');
const Error = require('./domain/buisnessErrror.domain');
const Success = require('./domain/success.domain');

class UserDeletedSuccess extends Success {
    constructor() {
        super();
        this.code = 200;
        this.message = 'User successfully deleted';
    }
}

async function deleteUser(user) {
    const userExists = await db.query(`SELECT * FROM Users WHERE username = ?`, [user.username]);
    switch (true) {
        case userExists instanceof Error.BusinessError:
            return userExists; // Error occured while querying the database
        case userExists.result.length > 0:
            const deleteUserResult = await db.query(`DELETE FROM Users WHERE username = ?`, [user.username]);
            switch (true) {
                case deleteUserResult instanceof Error.BusinessError:
                    return deleteUserResult; // Error occured while querying the database
                case deleteUserResult.result.affectedRows > 0:
                    return new UserDeletedSuccess();
                default:
                    return new Error.DeleteUserError(); // Error occured while deleting user
            }
        default:
            return new Error.UserDoesNotExist(); // User does not exist
    }
}

module.exports = {
    deleteUser,
};
