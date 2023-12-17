const db = require('./db.service');
const { addHours } = require('date-fns');
const jwt = require('jsonwebtoken');
const Error = require('./domain/buisnessErrror.domain');
const Success = require('./domain/success.domain');

class SuccessfulUserSessionCreation extends Success {
    constructor(sessionToken) {
        super();
        this.code = 200;
        this.message = 'User session successfully created';
        this.sessionToken = sessionToken;
    }
}

async function createUserSession(userid) {
    const expirationDate = addHours(new Date(), 2); // 2 hours from now
    const sessionToken = jwt.sign({ userid, expirationDate }, process.env.JWT_SECRET);
    const result = await db.query(`INSERT INTO UserSessions (userid, sessiontoken, expiration) VALUES (?, ?, ?)`, [
        userid,
        sessionToken,
        expirationDate,
    ]);

    if (result.affectedRows) {
        return new SuccessfulUserSessionCreation(sessionToken);
    }

    return new Error.UserSessionCreationError();
}

async function updateUserSession(sessionToken) {
    const expirationDate = addHours(new Date(), 2); // 2 hours from now
    const result = await db.query(`UPDATE UserSessions SET expiration = ? WHERE sessiontoken = ?`, [expirationDate, sessionToken]);

    if (result.affectedRows) {
        return true;
    }
    return false;
}

async function validateUserSession(sessionToken, username) {
    const userid = (await db.query(`SELECT id FROM Users WHERE username = ?`, [username]))[0].id;
    const result = await db.query(`SELECT * FROM UserSessions WHERE sessiontoken = ? AND userid = ?`, [sessionToken, userid]);
    const currentTime = new Date();
    const sessionExpired = currentTime > result[0].expirationDate;

    if (result.length && !sessionExpired) {
        return true;
    } else {
        return false;
    }
}

module.exports = { createUserSession, validateUserSession, updateUserSession };
