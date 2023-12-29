const db = require('./db.service');
const { addHours } = require('date-fns');
const jwt = require('jsonwebtoken');
const Error = require('./domain/buisnessErrror.domain');
const Success = require('./domain/success.domain');
const { status } = require('../configs/general.config');

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

class ValidateUserExistsSuccess extends Success {
    constructor(userid) {
        super();
        this.code = 200;
        this.message = 'User exists';
        this.userid = userid;
    }
}

class ValidateUsernameSuccess extends Success {
    constructor() {
        super();
        this.code = 200;
        this.message = 'Username is valid';
    }
}

class ValidateUserIsActiveSuccess extends Success {
    constructor() {
        super();
        this.code = 200;
        this.message = 'User is active';
    }
}

async function validateUserExists(username) {
    const validateUserExistsResult = await db.query(`SELECT * FROM Users WHERE username = ?`, [username]);
    if (validateUserExistsResult instanceof Error.BusinessError) return validateUserExistsResult; // Error occurred while querying the database
    if (validateUserExistsResult.result.length > 0) {
        const userid = validateUserExistsResult.result[0].id;
        return new ValidateUserExistsSuccess(userid); // User exists
    }

    return new Error.UserDoesNotExist(); // User does not exist
}

async function validateUsername(username) {
    const validateUsernameResult = await db.query(`SELECT * FROM Users WHERE username = ?`, [username]);
    if (validateUsernameResult instanceof Error.BusinessError) return validateUsernameResult; // Error occurred while querying the database
    if (validateUsernameResult.result.length > 0) return new Error.UsernameTakenError(); // Username is taken
    return new ValidateUsernameSuccess(); // Username is valid
}

async function validateUserIsActive(username) {
    const validateUserExistsResult = await validateUserExists(username);
    if (validateUserExistsResult instanceof Error.BusinessError) return validateUserExistsResult; // Error occurred while querying the database
    const validateUserIsActiveResult = await db.query(`SELECT * FROM Users WHERE username = ? AND status = ?`, [username, status.active]);
    if (validateUserIsActiveResult instanceof Error.BusinessError) return validateUserIsActiveResult; // Error occurred while querying the database
    if (validateUserIsActiveResult.result.length > 0) return new ValidateUserIsActiveSuccess(); // User is active
    return new Error.UserIsNotActiveError(validateUserIsActiveResult.result[0].status); // User is not active
}

async function createUserSession(userid) {
    const expirationDate = addHours(new Date(), 2); // 2 hours from now
    const sessionToken = jwt.sign({ userid, expirationDate }, process.env.JWT_SECRET);
    const existingUserSessionResult = await db.query(`SELECT * FROM UserSessions WHERE userid = ?`, [userid]);
    if (existingUserSessionResult instanceof Error.BusinessError) return existingUserSessionResult; // Error occurred while querying the database

    // If the User already has a session, update the expiration date
    if (existingUserSessionResult.result.length > 0) {
        const sessionUpdateResult = await updateUserSession(existingUserSessionResult.result[0].sessiontoken);
        if (sessionUpdateResult instanceof Error.BusinessError) return sessionUpdateResult; // Error occurred while updating user session

        return new UserSessionCreationSuccess(sessionUpdateResult.sessionToken);
    }

    const createSessionResult = await db.query(`INSERT INTO UserSessions (userid, sessiontoken, expiration) VALUES (?, ?, ?)`, [
        userid,
        sessionToken,
        expirationDate,
    ]);
    if (createSessionResult instanceof Error.BusinessError) return createSessionResult; // Error occurred while querying the database
    if (createSessionResult.result.affectedRows > 0) return new UserSessionCreationSuccess(sessionToken); // User session created successfully

    return new Error.UserSessionCreationError(); // Error occured while creating user session
}

async function updateUserSession(sessionToken) {
    const expirationDate = addHours(new Date(), 2); // 2 hours from now
    const updateSessionResult = await db.query(`UPDATE UserSessions SET expiration = ? WHERE sessiontoken = ?`, [
        expirationDate,
        sessionToken,
    ]);
    if (updateSessionResult instanceof Error.BusinessError) return updateSessionResult; // Error occurred while updating user session

    return new UserSessionUpdateSuccess(sessionToken); // User session updated successfully
}

async function validateUserSession(sessionToken, username) {
    const validateUserExistsResult = await validateUserExists(username);

    if (validateUserExistsResult instanceof Error.BusinessError) {
        return validateUserExistsResult; // Error occurred while querying the database
    }

    const validateUserSessionResult = await db.query(`SELECT * FROM UserSessions WHERE sessiontoken = ? AND userid = ?`, [
        sessionToken,
        validateUserExistsResult.userid,
    ]);

    if (validateUserSessionResult instanceof Error.BusinessError) return validateUserSessionResult; // Error occurred while querying the database
    if (validateUserSessionResult.result.length > 0) {
        const currentTime = new Date();
        const sessionExpired = currentTime > validateUserSessionResult.result[0].expiration;
        if (sessionExpired) return new Error.UserNotLoggedIn(); // Session token is invalid

        const updateUserSessionResult = await updateUserSession(sessionToken); // Update session expiration

        if (updateUserSessionResult instanceof Error.BusinessError) return updateUserSessionResult; // Error occurred while updating user session

        return new ValidateUserSessionSuccess();
    }

    return new Error.InvalidSessionTokenError(); // Session token is invalid
}

module.exports = { createUserSession, validateUserSession, updateUserSession, validateUserExists, validateUsername, validateUserIsActive };
