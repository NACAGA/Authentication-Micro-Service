const db = require('./db.service');
const { UsernameTakenErrror } = require('../errors');

async function createUser(newUser) {
    let response = {
        code: 500,
        message: 'Error creating a user: ',
    };

    // Check if username is already taken
    const userNameTaken = await db.query(`SELECT * FROM Users WHERE username = ?`, [newUser.username]);
    if (userNameTaken.length) {
        response.code = 403;
        message += 'Username is already taken';
        return new UsernameTakenErrror();
    }

    const result = await db.query(`INSERT INTO Users (username, password) VALUES (?, ?)`, [newUser.username, newUser.password]);
    if (result.affectedRows) {
        response.code = 201;
        response.message = 'User successfully created';
    } else {
        response.code = 400;
        response.message += 'User could not be created';
    }

    return response;
}

module.exports = {
    createUser,
};
