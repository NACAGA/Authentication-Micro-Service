const utils = require('../utils/userAuthentication.util');
const db = require('./db.service');
const Error = require('./domain/buisnessErrror.domain');
const Success = require('./domain/success.domain');
const userSession = require('./userSession.service');

class ChangeUserInfoSuccess extends Success {
    constructor() {
        super();
        this.code = 200;
        this.message = 'User info changed successfully';
    }
}

async function changeUserInfo(user) {
    const validUserSession = await userSession.validateUserSession(user.token, user.username);
    switch (true) {
        case validUserSession instanceof Error.BusinessError:
            return validUserSession;
        default:
            const { query, values } = utils.buildEditUserInfoQuery(user.new_fields, user.username);
            const changeUserInfoResult = await db.query(query, values);
            switch (true) {
                case changeUserInfoResult.result.affectedRows > 0:
                    const updateSessionResult = await userSession.updateUserSession(user.token);
                    switch (true) {
                        case updateSessionResult instanceof Error.BusinessError:
                            return updateSessionResult;
                        default:
                            return new ChangeUserInfoSuccess();
                    }
                default:
                    return new Error.ChangeUserInfoError();
            }
    }
}

module.exports = { changeUserInfo };
