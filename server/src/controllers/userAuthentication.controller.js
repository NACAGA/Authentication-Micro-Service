const createUserService = require('../services/createUser.service');
const loginUserService = require('../services/loginUser.service');
const deleteUserService = require('../services/deleteUser.service');
const changeUsernameService = require('../services/changeUsername.service');
const changePasswordService = require('../services/changePassword.service');
const changeUserInfoService = require('../services/changeUserInfo.service');

async function createUser(req, res, next) {
    try {
        const response = await createUserService.createUser(req.body);
        res.json(response.getResponse());
    } catch (err) {
        console.error('Error while creating a user:', err);
        next(err);
    }
}

async function deleteUser(req, res, next) {
    try {
        res.json(await deleteUserService.deleteUser(req.body));
    } catch (err) {
        console.error('Error while deleting a user:', err.message);
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

async function changeUsername(req, res, next) {
    try {
        res.json(await changeUsernameService.changeUsername(req.body));
    } catch (err) {
        console.error('Error while changing username:', err.message);
        next(err);
    }
}

async function changePassword(req, res, next) {
    try {
        res.json(await changePasswordService.changePassword(req.body));
    } catch (err) {
        console.error('Error while changing password:', err.message);
        next(err);
    }
}

async function changeUserInfo(req, res, next) {
    try {
        res.json(await changeUserInfoService.changeUserInfo(req.body));
    } catch (err) {
        console.error('Error while changing user info:', err.message);
        next(err);
    }
}

module.exports = {
    createUser,
    deleteUser,
    loginUser,
    changeUsername,
    changePassword,
    changeUserInfo,
};
