class BusinessError {
    constructor() {
        this.message = '';
        this.code = 500;
    }

    getResponse() {
        const properties = { status: this.code, body: {} };
        for (let key in this) {
            if (this.hasOwnProperty(key) && typeof this[key] !== 'function' && key !== 'code') {
                properties.body[key] = this[key];
            }
        }
        return properties;
    }
}

class UsernameTakenError extends BusinessError {
    constructor() {
        super();
        this.message = 'Username is already taken';
        this.code = 403;
    }
}

class InvalidUsernameOrPassowrd extends BusinessError {
    constructor() {
        super();
        this.message = 'Invalid username or password';
        this.code = 401;
    }
}

class UserNotLoggedIn extends BusinessError {
    constructor() {
        super();
        this.message = 'User is not logged in';
        this.code = 401;
    }
}

class UserSessionCreationError extends BusinessError {
    constructor() {
        super();
        this.message = 'Error creating user session';
        this.code = 500;
    }
}

class ChangeUsernameError extends BusinessError {
    constructor() {
        super();
        this.message = 'Error changing username';
        this.code = 500;
    }
}

class ChangePasswordError extends BusinessError {
    constructor() {
        super();
        this.message = 'Error changing password';
        this.code = 500;
    }
}

class CreateUserError extends BusinessError {
    constructor() {
        super();
        this.message = 'Error creating user';
        this.code = 500;
    }
}

class DeleteUserError extends BusinessError {
    constructor() {
        super();
        this.message = 'Error deleting user';
        this.code = 500;
    }
}

class UserDoesNotExist extends BusinessError {
    constructor() {
        super();
        this.message = 'User does not exist or is Deactivated';
        this.code = 403;
    }
}

class ChangeUserInfoError extends BusinessError {
    constructor() {
        super();
        this.message = 'Error changing user info';
        this.code = 500;
    }
}

class InvalidSqlQueryError extends BusinessError {
    constructor(queryValues) {
        super();
        this.message = 'Invalid SQL query';
        this.code = 500;
        this.queryValues = queryValues;
    }
}

class SessionUpdateError extends BusinessError {
    constructor() {
        super();
        this.message = 'Error updating user session';
        this.code = 500;
    }
}

class InvalidtokenError extends BusinessError {
    constructor(err) {
        super();
        this.message = 'Invalid session token';
        this.code = 403;
        this.error = err;
    }
}

class LogoutUserError extends BusinessError {
    constructor() {
        super();
        this.message = 'Error logging out the user';
        this.code = 500;
    }
}

class ChangeUserStatusError extends BusinessError {
    constructor() {
        super();
        this.message = 'Error changing user status';
        this.code = 500;
    }
}

class UserIsNotActiveError extends BusinessError {
    constructor(status) {
        super();
        this.message = 'User is not active';
        this.code = 403;
        this.status = status;
    }
}

class DatabaseError extends BusinessError {
    constructor(err) {
        super();
        this.message = 'Error querying the database';
        this.code = 500;
        this.error = err;
    }
}

class ActivateUserError extends BusinessError {
    constructor() {
        super();
        this.message = 'Error activating user';
        this.code = 500;
    }
}

class DeactivateUserError extends BusinessError {
    constructor() {
        super();
        this.message = 'Error deactivating user';
        this.code = 500;
    }
}

class BlockUserError extends BusinessError {
    constructor() {
        super();
        this.message = 'Error blocking user';
        this.code = 500;
    }
}

class UserIsBlockedError extends BusinessError {
    constructor() {
        super();
        this.message = 'User is blocked';
        this.code = 403;
    }
}

class GetUserInfoError extends BusinessError {
    constructor() {
        super();
        this.message = 'Error getting user info';
        this.code = 500;
    }
}

class GetUsersError extends BusinessError {
    constructor() {
        super();
        this.message = 'Error getting users';
        this.code = 500;
    }
}

module.exports = {
    BusinessError,
    UsernameTakenError,
    InvalidUsernameOrPassowrd,
    UserNotLoggedIn,
    UserSessionCreationError,
    ChangeUsernameError,
    ChangePasswordError,
    CreateUserError,
    DeleteUserError,
    UserDoesNotExist,
    ChangeUserInfoError,
    InvalidSqlQueryError,
    SessionUpdateError,
    InvalidtokenError,
    LogoutUserError,
    ChangeUserStatusError,
    UserIsNotActiveError,
    DatabaseError,
    ActivateUserError,
    DeactivateUserError,
    BlockUserError,
    UserIsBlockedError,
    GetUserInfoError,
    GetUsersError,
};
