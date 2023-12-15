const db = require('./db.service');

async function createUser(newUser) {
    const result = await db.query(
        `INSERT INTO Users
        (username, password)
        VALUES
        (?, ?)`,
        [newUser.username, newUser.password]
    );

    let message = 'Error creating a user';
    if (result.affectedRows) {
        message = 'User successfully created';
    }

    return message;
}

module.exports = {
    createUser,
};
