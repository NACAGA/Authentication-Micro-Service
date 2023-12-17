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
    if (!userExists.length) {
        return new Error.UserDoesNotExist();
    }

    const result = await db.query(`DELETE FROM Users WHERE username = ?`, [user.username]);
    if (result.affectedRows) {
        return new UserDeletedSuccess();
    }

    return new Error.DeleteUserError();
}

module.exports = {
    deleteUser,
};
