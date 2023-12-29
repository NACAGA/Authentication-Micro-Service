const { status } = require('../configs/general.config');
const db = require('./db.service');
const Error = require('./domain/buisnessErrror.domain');
const Success = require('./domain/success.domain');

class UserLoggedOutSuccess extends Success {
    constructor() {
        super();
        this.code = 200;
        this.message = 'User successfully logged out';
    }
}

async function logoutUser(user) {
    const validUsernameResult = await db.query(`SELECT * FROM Users WHERE username = ? AND status = ?`, [user.username, status.active]);
    switch (true) {
        case validUsernameResult.result.length > 0:
            const userid = validUsernameResult.result[0].id;
            const nullDate = new Date(0);
            const logoutUserResult = await db.query(`UPDATE UserSessions SET expiration = ? WHERE userid = ?`, [nullDate, userid]);
            switch (true) {
                case logoutUserResult.result.affectedRows > 0:
                    return new UserLoggedOutSuccess();
                default:
                    return new Error.LogoutUserError(); // Error occured while logging out user
            }
        default:
            return new Error.UserDoesNotExist(); // User does not exist
    }
}

module.exports = { logoutUser };
