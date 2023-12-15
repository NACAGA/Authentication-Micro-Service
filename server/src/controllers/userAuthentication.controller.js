const createUserService = require('../services/createUser.service');
const loginUserService = require('../services/loginUser.service');

async function createUser(req, res, next) {
    try {
        res.json(await createUserService.createUser(req.body));
    } catch (err) {
        console.error('Error while creating a user:', err.message);
        next(err);
    }
}

async function loginUser(req, res, next) {
    try {
        res.json(await loginUserService.loginUser(req.body));
    } catch (err) {
        console.error('Error while logging in a user:', err.message);
        next(err);
    }
}

module.exports = {
    createUser,
    loginUser,
};
