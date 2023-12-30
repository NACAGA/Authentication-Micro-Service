const db = require('./db.service');
const userManager = require('./authenticationManager.service');
const Error = require('./domain/buisnessErrror.domain');
const Success = require('./domain/success.domain');

class UsernameChangedSuccess extends Success {
    constructor(userid, username) {
        super();
        this.code = 200;
        this.message = 'Username changed successfully';
        this.userid = userid;
        this.username = username;
    }
}

async function changeUsername(user) {
    const validUserSessionResult = await userManager.validateUserSession(user.token);
    if (validUserSessionResult instanceof Error.BusinessError) return validUserSessionResult; // User session is invalid

    const validateUsernameResult = await userManager.validateUsername(user.new_username);
    if (validateUsernameResult instanceof Error.BusinessError) return validateUsernameResult; // Username is taken

    const changeUsernameResult = await db.query(`UPDATE Users SET username = ? WHERE id = ?`, [user.new_username, user.id]);
    if (changeUsernameResult instanceof Error.BusinessError) return changeUsernameResult; // Error occured while changing username
    if (changeUsernameResult.result.affectedRows > 0) return new UsernameChangedSuccess(validUserSessionResult.userid, user.new_username);

    return new Error.ChangeUsernameError();
}

module.exports = { changeUsername, UsernameChangedSuccess };
