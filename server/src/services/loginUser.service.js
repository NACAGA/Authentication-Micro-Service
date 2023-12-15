const db = require('./db.service');

async function loginUser(user) {
    const result = await db.query(`SELECT * FROM Users WHERE username = ?`, [user.username]);
    console.log(result);

    let message = 'Error logging in a user';
    if (result.length) {
        message = 'User successfully logged in';
    }

    return message;
}

module.exports = { loginUser };
