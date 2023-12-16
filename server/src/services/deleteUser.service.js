const db = require('./db.service');

async function deleteUser(newUser) {
    let message = 'Error deleting a user: ';

    const result = await db.query(`DELETE FROM Users WHERE username = ? AND password = ?`, [newUser.username, newUser.password]);
    if (result.affectedRows) {
        message = 'User successfully deleted';
    } else {
        message += 'User could not be deleted';
    }

    return message;
}

module.exports = {
    deleteUser,
};
