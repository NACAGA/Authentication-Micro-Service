const userManager = require('./userManager.service');

async function validateUserSession(user) {
    return userManager.validateUserSession(user.sessionToken, user.username);
}

module.exports = { validateUserSession };
