const createUserService = require('../services/createUser.service');

async function createUser(req, res, next) {
    try {
        res.json(await createUserService.createUser(req.body));
    } catch (err) {
        console.error('Error while creating a user:', err.message);
        next(err);
    }
}

module.exports = {
    createUser,
};
