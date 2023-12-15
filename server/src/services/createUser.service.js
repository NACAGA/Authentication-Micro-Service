const db = require('./db.service');

async function createUser(newUser) {
    let message = 'Error creating a user: ';

    // Check if username is already taken
    const userNameTaken = await db.query(`SELECT * FROM Users WHERE username = ?`, [newUser.username]);
    if (userNameTaken.length) {
        message += 'Username is already taken';
        return message;
    }

    const result = await db.query(`INSERT INTO Users (username, password) VALUES (?, ?)`, [newUser.username, newUser.password]);
    if (result.affectedRows) {
        message = 'User successfully created';
    } else {
        message += 'User could not be created';
    }

    return message;
}

module.exports = {
    createUser,
};
