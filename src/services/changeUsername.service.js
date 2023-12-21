const db = require('./db.service');
const userSession = require('./userSession.service');
const Error = require('./domain/buisnessErrror.domain');
const Success = require('./domain/success.domain');

class UsernameChangedSuccess extends Success {
    constructor() {
        super();
        this.code = 200;
        this.message = 'Username changed successfully';
    }
}

async function changeUsername(user) {
    const validUserSessionResult = await userSession.validateUserSession(user.sessionToken, user.username);
    switch (true) {
        case validUserSessionResult instanceof Error.BusinessError:
            return validUserSessionResult;
        default:
            // Check if username is already taken
            const existingUsernameResult = await db.query(`SELECT * FROM Users WHERE username = ?`, [user.new_username]);
            switch (true) {
                case existingUsernameResult instanceof Error.BusinessError:
                    return existingUsernameResult;
                case existingUsernameResult.result.length > 0:
                    return new Error.UsernameTakenError();
                default:
                    break;
            }
    }

    const changeUsernameResult = await db.query(`UPDATE Users SET username = ? WHERE username = ?`, [user.new_username, user.username]);
    switch (true) {
        case changeUsernameResult instanceof Error.BusinessError:
            return changeUsernameResult;
        case changeUsernameResult.result.affectedRows > 0:
            const updateSessionResult = await userSession.updateUserSession(user.sessionToken);
            switch (true) {
                case updateSessionResult instanceof Error.BusinessError:
                    return updateSessionResult;
                default:
                    return new UsernameChangedSuccess();
            }
        default:
            return new Error.ChangeUsernameError();
    }
}

module.exports = { changeUsername, UsernameChangedSuccess };
