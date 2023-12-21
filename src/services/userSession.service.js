const db = require('./db.service');
const { addHours } = require('date-fns');
const jwt = require('jsonwebtoken');
const Error = require('./domain/buisnessErrror.domain');
const Success = require('./domain/success.domain');

class UserSessionCreationSuccess extends Success {
    constructor(sessionToken) {
        super();
        this.code = 200;
        this.message = 'User session successfully created';
        this.sessionToken = sessionToken;
    }
}

class UserSessionUpdateSuccess extends Success {
    constructor(sessionToken) {
        super();
        this.code = 200;
        this.message = 'User session successfully updated';
        this.sessionToken = sessionToken;
    }
}

class ValidateUserSessionSuccess extends Success {
    constructor() {
        super();
        this.code = 200;
        this.message = 'User session is valid';
    }
}

async function createUserSession(userid) {
    const expirationDate = addHours(new Date(), 2); // 2 hours from now
    const sessionToken = jwt.sign({ userid, expirationDate }, process.env.JWT_SECRET);
    const existingUserSession = await db.query(`SELECT * FROM UserSessions WHERE userid = ?`, [userid]);
    switch (true) {
        case existingUserSession instanceof Error.BusinessError:
            return existingUserSession; // Error occured while querying the database
        case existingUserSession.result.length > 0:
            if (existingUserSession.result[0].expiration > new Date()) {
                // User session exists and is not expired
                const sessionUpdateResult = await updateUserSession(existingUserSession.result[0].sessiontoken);
                switch (true) {
                    case sessionUpdateResult instanceof Error.BusinessError:
                        return sessionUpdateResult; // Error occured while updating user session
                    default: // User session updated successfully
                        return new UserSessionCreationSuccess(sessionUpdateResult.sessionToken);
                }
            }
        default:
            break;
    }
    const createSessionResult = await db.query(`INSERT INTO UserSessions (userid, sessiontoken, expiration) VALUES (?, ?, ?)`, [
        userid,
        sessionToken,
        expirationDate,
    ]);
    switch (true) {
        case createSessionResult instanceof Error.BusinessError:
            return createSessionResult; // Error occured while querying the database
        case createSessionResult.result.affectedRows > 0:
            // User session created successfully
            return new UserSessionCreationSuccess(sessionToken);
        default:
            return new Error.UserSessionCreationError(); // Error occured while creating user session
    }
}

async function updateUserSession(sessionToken) {
    const expirationDate = addHours(new Date(), 2); // 2 hours from now
    const updateSessionResult = await db.query(`UPDATE UserSessions SET expiration = ? WHERE sessiontoken = ?`, [
        expirationDate,
        sessionToken,
    ]);
    switch (true) {
        case updateSessionResult instanceof Error.BusinessError:
            return updateSessionResult; // Error occured while querying the database
        case updateSessionResult.result.affectedRows > 0:
            return new UserSessionUpdateSuccess(sessionToken); // User session updated successfully
        default:
            return new Error.SessionUpdateError(); // Error occured while updating user session
    }
}

async function validateUserSession(sessionToken, username) {
    const getUseridResult = await db.query(`SELECT id FROM Users WHERE username = ?`, [username]);
    switch (true) {
        case getUseridResult instanceof Error.BusinessError:
            return getUseridResult; // Error occured while querying the database
        case getUseridResult.result.length > 0:
            const userid = getUseridResult.result[0].id;
            const validateUserSessionResult = await db.query(`SELECT * FROM UserSessions WHERE sessiontoken = ? AND userid = ?`, [
                sessionToken,
                userid,
            ]);
            switch (true) {
                case validateUserSessionResult instanceof Error.BusinessError:
                    return validateUserSessionResult; // Error occured while querying the database
                case validateUserSessionResult.result.length > 0:
                    const currentTime = new Date();
                    const sessionExpired = currentTime > validateUserSessionResult.result[0].expiration;
                    if (sessionExpired) {
                        return new Error.UserNotLoggedIn(); // Session token is invalid
                    }
                    return new ValidateUserSessionSuccess();
                default:
                    return new Error.InvalidSessionTokenError(); // Session token is invalid
            }
        default:
            return new Error.UserDoesNotExist(); // User does not exist
    }
}

module.exports = { createUserSession, validateUserSession, updateUserSession };
