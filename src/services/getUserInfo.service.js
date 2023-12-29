const db = require('./db.service');
const Success = require('./domain/success.domain');
const Error = require('./domain/buisnessErrror.domain');
const { status } = require('../configs/general.config');

class GetUserInfoSuccess extends Success {
    constructor(user) {
        super();
        this.code = 200;
        this.message = 'Users successfully retrieved';
        this.user = user;
    }
}

async function getUserInfo(user) {
    const getUserInfoResult = await db.query(`SELECT * FROM Users WHERE username = ? and status IN (?, ?)`, [
        user.username,
        status.active,
        status.blocked,
    ]);
    if (getUserInfoResult instanceof Error.BusinessError) return getUserInfoResult;
    if (getUserInfoResult.result.length === 0) return new Error.GetUserInfoError();
    const properties = {};
    const userInfo = getUserInfoResult.result[0];
    for (let key in userInfo) {
        if (userInfo.hasOwnProperty(key) && key !== 'password') {
            if (userInfo[key] === null) properties[key] = 'NULL';
            else properties[key] = userInfo[key];
        }
    }
    return new GetUserInfoSuccess(properties);
}

module.exports = { getUserInfo, GetUserInfoSuccess };
