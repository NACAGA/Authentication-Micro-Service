const db = require('./db.service');
const { addHours } = require('date-fns');
const jwt = require('jsonwebtoken');
const Error = require('./domain/buisnessErrror.domain');
const Success = require('./domain/success.domain');
const { status } = require('../configs/general.config');
const { stat } = require('fs');

class UserSessionCreationSuccess extends Success {
    constructor(userid, token) {
        super();
        this.code = 200;
        this.message = 'User session successfully created';
        this.userid = userid;
        this.token = token;
    }
}

class UserSessionUpdateSuccess extends Success {
    constructor(userid, token) {
        super();
        this.code = 200;
        this.message = 'User session successfully updated';
        this.userid = userid;
        this.token = token;
    }
}

class ValidateUserSessionSuccess extends Success {
    constructor(userid, username, token) {
        super();
        this.code = 200;
        this.message = 'User session is valid';
        this.userid = userid;
        this.username = username;
        this.token = token;
    }
}

class ValidateUserExistsSuccess extends Success {
    constructor(userid, username) {
        super();
        this.code = 200;
        this.message = 'User exists';
        this.userid = userid;
        this.username = username;
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
    constructor(userid, username) {
        super();
        this.code = 200;
        this.message = 'User is active';
        this.userid = userid;
        this.username = username;
    }
}

async function validateUserExists(userid) {
    const validateUserExistsResult = await db.query(`SELECT * FROM Users WHERE id = ?`, [userid]);
    if (validateUserExistsResult instanceof Error.BusinessError) return validateUserExistsResult; // Error occurred while querying the database
    if (validateUserExistsResult.result.length > 0) {
        const username = validateUserExistsResult.result[0].username;
        return new ValidateUserExistsSuccess(userid, username); // User exists
    }

    return new Error.UserDoesNotExist(); // User does not exist
}

async function validateUsername(username) {
    const validateUsernameResult = await db.query(`SELECT * FROM Users WHERE username = ? AND status IN (?, ?)`, [
        username,
        status.active,
        status.blocked,
    ]); // Only check for existing usernames with active or blocked status
    if (validateUsernameResult instanceof Error.BusinessError) return validateUsernameResult; // Error occurred while querying the database
    if (validateUsernameResult.result.length > 0) return new Error.UsernameTakenError(); // Username is taken
    return new ValidateUsernameSuccess(); // Username is valid
}

async function validateUserIsActive(userid) {
    const validateUserExistsResult = await validateUserExists(userid);
    if (validateUserExistsResult instanceof Error.BusinessError) return validateUserExistsResult; // Error occurred while querying the database
    const validateUserIsActiveResult = await db.query(`SELECT * FROM Users WHERE userid = ? AND status = ?`, [userid, status.active]);
    if (validateUserIsActiveResult instanceof Error.BusinessError) return validateUserIsActiveResult; // Error occurred while querying the database
    if (validateUserIsActiveResult.result.length > 0) return new ValidateUserIsActiveSuccess(); // User is active
    return new Error.UserIsNotActiveError(validateUserIsActiveResult.result[0].status); // User is not active
}

async function createUserSession(userid) {
    const token = jwt.sign({ id: userid }, process.env.JWT_SECRET, { expiresIn: '2h' });
    return new UserSessionCreationSuccess(userid, token); // User session created successfully
}

async function validateUserSession(token) {
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        const userid = data.id;
        const validateUserExistsResult = await validateUserExists(userid); // Validate that the user exists
        if (validateUserExistsResult instanceof Error.BusinessError) return validateUserExistsResult; // Error occurred while querying the database
        return ValidateUserSessionSuccess(userid, validateUserExistsResult.username, token); // User session is valid
    } catch (err) {
        return new Error.InvalidtokenError(err); // Session token is invalid
    }
}

async function updateUserSession(token) {
    const validateUserSessionResult = await validateUserSession(token);
    if (validateUserSessionResult instanceof Error.BusinessError) return validateUserSessionResult; // Error occurred while validating user session

    const userid = validateUserSessionResult.userid;
    const newToken = jwt.sign({ id: userid }, process.env.JWT_SECRET, { expiresIn: '2h' });

    return new UserSessionUpdateSuccess(userid, newToken); // User session updated successfully
}

module.exports = { createUserSession, validateUserSession, updateUserSession, validateUserExists, validateUsername, validateUserIsActive };
