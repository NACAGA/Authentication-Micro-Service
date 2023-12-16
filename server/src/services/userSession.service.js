const db = require('./db.service');
const { addHours } = require('date-fns');
const jwt = require('jsonwebtoken');

async function createUserSession(userid) {
    const expirationDate = addHours(new Date(), 2); // 2 hours from now
    const sessionToken = jwt.sign({ userid, expirationDate }, process.env.JWT_SECRET);
    const result = await db.query(`INSERT INTO UserSessions (userid, sessiontoken, expiration) VALUES (?, ?, ?)`, [
        userid,
        sessionToken,
        expirationDate,
    ]);

    let response = {
        code: 401,
        message: 'Error creating a user session',
    };

    if (result.affectedRows) {
        response.code = 200;
        response.message = 'User session successfully created';
    }

    return response;
}

async function updateUserSession(sessionToken) {
    const expirationDate = addHours(new Date(), 2); // 2 hours from now
    const result = await db.query(`UPDATE UserSessions SET expiration = ? WHERE sessiontoken = ?`, [expirationDate, sessionToken]);

    if (result.affectedRows) {
        return true;
    }
    return false;
}

async function validateUserSession(sessionToken) {
    const result = await db.query(`SELECT * FROM UserSessions WHERE sessiontoken = ? AND userid = ?`, [sessionToken]);
    const currentTime = new Date();

    if (result.length) {
        const sessionExpired = currentTime > userSession.expirationDate;
        return !sessionExpired;
    } else {
        return false;
    }
}

module.exports = { createUserSession, validateUserSession, updateUserSession };
