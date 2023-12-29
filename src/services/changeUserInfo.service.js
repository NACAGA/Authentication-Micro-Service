const utils = require('../utils/userAuthentication.util');
const db = require('./db.service');
const Error = require('./domain/buisnessErrror.domain');
const Success = require('./domain/success.domain');
const userManager = require('./authenticationManager.service');

class ChangeUserInfoSuccess extends Success {
    constructor() {
        super();
        this.code = 200;
        this.message = 'User info changed successfully';
    }
}

async function changeUserInfo(user) {
    const validateUserSessionResult = await userManager.validateUserSession(user.sessionToken, user.username);
    if (validateUserSessionResult instanceof Error.BusinessError) return validateUserSessionResult;
    const userTableFieldsResult = await db.query(
        `SELECT COLUMN_NAME FROM information_schema.columns WHERE TABLE_NAME = 'Users' AND COLUMN_NAME NOT IN ('password', 'id', 'status', 'username')`
    );
    if (userTableFieldsResult instanceof Error.BusinessError) return userTableFieldsResult;
    const tableColumns = userTableFieldsResult.result.map((column) => column.COLUMN_NAME);

    const { query, values } = utils.buildEditUserInfoQuery(user.new_fields, user.username, tableColumns);
    const changeUserInfoResult = await db.query(query, values);
    if (changeUserInfoResult instanceof Error.BusinessError) return changeUserInfoResult;

    if (changeUserInfoResult.result.affectedRows > 0) {
        const updateSessionResult = await userManager.updateUserSession(user.sessionToken);
        if (updateSessionResult instanceof Error.BusinessError) return updateSessionResult;
        return new ChangeUserInfoSuccess(); // User info changed successfully
    }

    return new Error.ChangeUserInfoError();
}

module.exports = { changeUserInfo };
