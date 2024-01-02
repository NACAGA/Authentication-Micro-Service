const db = require('./db.service');
const Error = require('./domain/buisnessErrror.domain');
const Success = require('./domain/success.domain');
const { status } = require('../configs/general.config');
const userManager = require('./authenticationManager.service');
class CreateUserSuccess extends Success {
    constructor(username) {
        super();
        this.code = 201;
        this.message = 'User successfully created';
        this.username = username;
    }
}

async function createUser(user) {
    const validUsernameResult = await userManager.validateUsername(user.username);
    if (validUsernameResult instanceof Error.BusinessError) return validUsernameResult;

    const createUserResult = await db.query(`INSERT INTO Users (username, password, status) VALUES (?, ?, ?)`, [
        user.username,
        user.password,
        status.active,
    ]);
    if (createUserResult instanceof Error.DatabaseError) return createUserResult;
    if (createUserResult.result.affectedRows > 0) return new CreateUserSuccess(user.username);

    return new Error.CreateUserError();
}

module.exports = {
    createUser,
    CreateUserSuccess,
};
