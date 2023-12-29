const db = require('./db.service');
const Success = require('./domain/success.domain');
const Error = require('./domain/buisnessErrror.domain');
const { status } = require('../configs/general.config');

class GetUsersSuccess extends Success {
    constructor(users) {
        super();
        this.code = 200;
        this.message = 'Users successfully retrieved';
        this.users = users;
    }
}

async function getUsers(request) {
    const getUsersResult = await db.query(`SELECT * FROM Users WHERE status IN (?, ?)`, [status.active, status.blocked]);
    if (getUsersResult instanceof Error.BusinessError) return getUsersResult;
    let users = [];
    for (const user of getUsersResult.result) {
        const properties = {};
        for (let key in user) {
            if (user.hasOwnProperty(key) && request.fields.includes(key) && key !== 'password') {
                if (user[key] === null) properties[key] = 'NULL';
                else properties[key] = user[key];
            }
        }
        users.push(properties);
    }
    return new GetUsersSuccess(users);
}

module.exports = { getUsers, GetUsersSuccess };
