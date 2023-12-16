const db = require('./db.service');

async function deleteUser(newUser) {
    let response = {
        code: 500,
        message: 'Error deleting a user: ',
    };

    const result = await db.query(`DELETE FROM Users WHERE username = ? AND password = ?`, [newUser.username, newUser.password]);
    if (result.affectedRows) {
        response.code = 200;
        response.message = 'User successfully deleted';
    } else {
        response.code = 401;
        response.message += 'User could not be deleted';
    }

    return response;
}

module.exports = {
    deleteUser,
};
