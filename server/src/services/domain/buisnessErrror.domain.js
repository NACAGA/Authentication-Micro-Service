class BusinessError extends Error {
    constructor(message) {
        super(message);
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
        super('Username is already taken');
        this.code = 403;
    }
}

class InvalidUsernameOrPassowrd extends BusinessError {
    constructor() {
        super('Invalid username or password');
        this.code = 401;
    }
}

class UserNotLoggedIn extends BusinessError {
    constructor() {
        super('User is not logged in');
        this.code = 401;
    }
}

module.exports = {
    BusinessError,
    UsernameTakenError,
    InvalidUsernameOrPassowrd,
    UserNotLoggedIn,
};
