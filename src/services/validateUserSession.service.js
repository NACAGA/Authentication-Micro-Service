const userManager = require('./authenticationManager.service');

async function validateUserSession(user) {
    return userManager.validateUserSession(user.token);
}

module.exports = { validateUserSession };
