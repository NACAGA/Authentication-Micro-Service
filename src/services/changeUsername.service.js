const db = require('./db.service');
const userManager = require('./authenticationManager.service');
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
    const validUserSessionResult = await userManager.validateUserSession(user.sessionToken, user.username);
    if (validUserSessionResult instanceof Error.BusinessError) return validUserSessionResult; // User session is invalid

    const validateUsernameResult = await userManager.validateUsername(user.new_username);
    if (validateUsernameResult instanceof Error.BusinessError) return validateUsernameResult; // Username is taken

    const changeUsernameResult = await db.query(`UPDATE Users SET username = ? WHERE username = ?`, [user.new_username, user.username]);
    if (changeUsernameResult instanceof Error.BusinessError) return changeUsernameResult; // Error occured while changing username
    if (changeUsernameResult.result.affectedRows > 0) {
        const updateSessionResult = await userManager.updateUserSession(user.sessionToken);
        if (updateSessionResult instanceof Error.BusinessError) return updateSessionResult; // Error occured while updating user session

        return new UsernameChangedSuccess();
    }

    return new Error.ChangeUsernameError();
}

module.exports = { changeUsername, UsernameChangedSuccess };
