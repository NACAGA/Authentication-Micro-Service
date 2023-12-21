const db = require('./db.service');
const userSession = require('./userSession.service');
const Error = require('./domain/buisnessErrror.domain');
const Success = require('./domain/success.domain');
const { tr } = require('date-fns/locale');

class PasswordChangedSuccess extends Success {
    constructor() {
        super();
        this.code = 200;
        this.message = 'Password changed successfully';
    }
}

async function changePassword(user) {
    const validUserSessionResult = await userSession.validateUserSession(user.sessionToken, user.username);
    switch (true) {
        case validUserSessionResult instanceof Error.BusinessError:
            return validUserSessionResult;
        default:
            const changePasswordResult = await db.query(`UPDATE Users SET password = ? WHERE username = ?`, [
                user.new_password,
                user.username,
            ]);
            switch (true) {
                case changePasswordResult instanceof Error.BusinessError:
                    return changePasswordResult;
                case changePasswordResult.result.affectedRows > 0:
                    const updateSessionResult = await userSession.updateUserSession(user.sessionToken);
                    switch (true) {
                        case updateSessionResult instanceof Error.BusinessError:
                            return updateSessionResult;
                        default:
                            return new PasswordChangedSuccess();
                    }
                default:
                    return new Error.ChangePasswordError();
            }
    }
}

module.exports = { changePassword, PasswordChangedSuccess };
