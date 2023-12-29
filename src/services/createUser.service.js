const db = require('./db.service');
const Error = require('./domain/buisnessErrror.domain');
const Success = require('./domain/success.domain');
const { status } = require('../configs/general.config');
const userManager = require('./userManager.service');
class CreateUserSuccess extends Success {
    constructor() {
        super();
        this.code = 201;
        this.message = 'User successfully created';
    }
}

async function createUser(newUser) {
    const validUsernameResult = await userManager.validateUsername(newUser.username);
    if (validUsernameResult instanceof Error.BusinessError) return validUsernameResult;

    const createUserResult = await db.query(`INSERT INTO Users (username, password, status) VALUES (?, ?, ?)`, [
        newUser.username,
        newUser.password,
        status.active,
    ]);
    if (createUserResult instanceof Error.DatabaseError) return createUserResult;
    if (createUserResult.result.affectedRows > 0) return new CreateUserSuccess();

    return new Error.CreateUserError();
}

module.exports = {
    createUser,
    CreateUserSuccess,
};
