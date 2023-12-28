const db = require('./db.service');
const Error = require('./domain/buisnessErrror.domain');
const Success = require('./domain/success.domain');
const { status } = require('../configs/general.config');

class ChangeUserStatusSuccess extends Success {
    constructor() {
        super();
        this.code = 200;
        this.message = 'User status successfully changed';
    }
}

async function changeUserStatus(user) {
    const validUsernameResult = await db.query(`SELECT * FROM Users WHERE username = ?`, [user.username]);
    switch (true) {
        case validUsernameResult.result.length > 0:
            const userid = validUsernameResult.result[0].id;
            const changeUserStatusResult = await db.query(`UPDATE Users SET status = ? WHERE userid = ?`, [user.new_status, userid]);
            switch (true) {
                case changeUserStatusResult.result.affectedRows > 0:
                    return new ChangeUserStatusSuccess();
                default:
                    return new Error.ChangeUserStatusError(); // Error occured while deactivating user
            }
        default:
            return new Error.UserDoesNotExist(); // User does not exist
    }
}

modules.exports = { changeUserStatus };