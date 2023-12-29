class BusinessError {
    constructor() {
        this.message = '';
        this.code = 500;
    }

    getResponse() {
        return {
            code: this.code,
            message: `Error: ${this.message}`,
        };
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
        this.message = 'User does not exist';
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

class InvalidSessionTokenError extends BusinessError {
    constructor() {
        super();
        this.message = 'Invalid session token';
        this.code = 403;
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
    InvalidSessionTokenError,
    LogoutUserError,
    ChangeUserStatusError,
    UserIsNotActiveError,
    DatabaseError,
};
