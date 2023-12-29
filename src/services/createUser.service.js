const { user } = require('../configs/db.config');
const db = require('./db.service');
const Error = require('./domain/buisnessErrror.domain');
const Success = require('./domain/success.domain');
const { status } = require('../configs/general.config');
class CreateUserSuccess extends Success {
    constructor() {
        super();
        this.code = 201;
        this.message = 'User successfully created';
    }
}

async function createUser(newUser) {
    // Check if username is already taken
    const validUsernameResult = await db.query(`SELECT * FROM Users WHERE username = ?`, [newUser.username]);
    switch (true) {
        case validUsernameResult instanceof Error.BusinessError:
            return validUsernameResult;
        case validUsernameResult.result.length > 0:
            return new Error.UsernameTakenError();
        default:
            const createUserResult = await db.query(`INSERT INTO Users (username, password, status) VALUES (?, ?, ?)`, [
                newUser.username,
                newUser.password,
                status.active,
            ]);
            switch (true) {
                case createUserResult instanceof Error.BusinessError:
                    return createUserResult;
                case createUserResult.result.affectedRows > 0:
                    return new CreateUserSuccess();
                default:
                    return new Error.CreateUserError();
            }
    }
}

module.exports = {
    createUser,
    CreateUserSuccess,
};
