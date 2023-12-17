const db = require('./db.service');
const Error = require('./domain/buisnessErrror.domain');
const Success = require('./domain/success.domain');
class CreateUserSuccess extends Success {
    constructor() {
        super();
        this.code = 201;
        this.message = 'User successfully created';
    }
}

async function createUser(newUser) {
    // Check if username is already taken
    const userNameTaken = await db.query(`SELECT * FROM Users WHERE username = ?`, [newUser.username]);
    if (userNameTaken.length) {
        return new Error.UsernameTakenError();
    }

    const result = await db.query(`INSERT INTO Users (username, password) VALUES (?, ?)`, [newUser.username, newUser.password]);
    if (result.affectedRows) {
        return new CreateUserSuccess();
    }

    return new Error.CreateUserError();
}

module.exports = {
    createUser,
    CreateUserSuccess,
};
