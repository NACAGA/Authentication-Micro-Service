const userManager = require('./authenticationManager.service');

async function validateUserSession(token) {
    return userManager.validateUserSession(token);
}

module.exports = { validateUserSession };
