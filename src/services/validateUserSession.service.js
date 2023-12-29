const userManager = require('./authenticationManager.service');

async function validateUserSession(user) {
    return userManager.validateUserSession(user.sessionToken, user.username);
}

module.exports = { validateUserSession };
