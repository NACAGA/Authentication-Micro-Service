const createUserService = require('../services/createUser.service');
const loginUserService = require('../services/loginUser.service');
const deleteUserService = require('../services/deleteUser.service');
const changeUsernameService = require('../services/changeUsername.service');
const changePasswordService = require('../services/changePassword.service');
const changeUserInfoService = require('../services/changeUserInfo.service');
const validateUserSessionService = require('../services/validateUserSession.service');
const activateUserService = require('../services/activateUser.service');
const deactivateUserService = require('../services/deactivateUser.service');
const blockUserService = require('../services/blockUser.service');
const getUsersService = require('../services/getUsers.service');
const getUserInfoService = require('../services/getUserInfo.service');
const db = require('../services/db.service');

async function createUser(req, res, next) {
    try {
        let response = await createUserService.createUser(req.body);
        response = response.getResponse();
        res.status(response.status).json(response.body);
    } catch (err) {
        console.error('Error while creating a user:', err);
        next(err);
    }
}

async function deleteUser(req, res, next) {
    try {
        let response = await deleteUserService.deleteUser(req.body);
        response = response.getResponse();
        res.status(response.status).json(response.body);
    } catch (err) {
        console.error('Error while deleting a user:', err.message);
        next(err);
    }
}

async function loginUser(req, res, next) {
    try {
        let response = await loginUserService.loginUser(req.body);
        response = response.getResponse();
        res.setHeader('Authorization', 'Bearer ' + response.token);
        res.status(response.status).json(response.body);
    } catch (err) {
        console.error('Error while logging in a user:', err.message);
        next(err);
    }
}

async function changeUsername(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        let response = await changeUsernameService.changeUsername(token, req.body);
        response = response.getResponse();
        res.status(response.status).json(response.body);
    } catch (err) {
        console.error('Error while changing username:', err.message);
        next(err);
    }
}

async function changePassword(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        let response = await changePasswordService.changePassword(token, req.body);
        response = response.getResponse();
        res.status(response.status).json(response.body);
    } catch (err) {
        console.error('Error while changing password:', err.message);
        next(err);
    }
}

async function changeUserInfo(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        let response = await changeUserInfoService.changeUserInfo(token, req.body);
        response = response.getResponse();
        res.status(response.status).json(response.body);
    } catch (err) {
        console.error('Error while changing user info:', err.message);
        next(err);
    }
}

async function activateUser(req, res, next) {
    try {
        let response = await activateUserService.activateUser(req.body);
        response = response.getResponse();
        res.status(response.status).json(response.body);
    } catch (err) {
        console.error('Error while activating a user:', err.message);
        next(err);
    }
}

async function deactivateUser(req, res, next) {
    try {
        let response = await deactivateUserService.deactivateUser(req.body);
        response = response.getResponse();
        res.status(response.status).json(response.body);
    } catch (err) {
        console.error('Error while deactivating a user:', err.message);
        next(err);
    }
}

async function blockUser(req, res, next) {
    try {
        let response = await blockUserService.blockUser(req.body);
        response = response.getResponse();
        res.status(response.status).json(response.body);
    } catch (err) {
        console.error('Error while blocking a user:', err.message);
        next(err);
    }
}

async function validateUserSession(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        let response = await validateUserSessionService.validateUserSession(token);
        response = response.getResponse();
        res.status(response.status).json(response.body);
    } catch (err) {
        console.error('Error while validating user session:', err.message);
        next(err);
    }
}

async function getUsers(req, res, next) {
    try {
        let response = await getUsersService.getUsers(req.body);
        response = response.getResponse();
        res.status(response.status).json(response.body);
    } catch (err) {
        console.error('Error while getting users:', err.message);
        next(err);
    }
}

async function getUserInfo(req, res, next) {
    try {
        let response = await getUserInfoService.getUserInfo(req.body);
        response = response.getResponse();
        res.status(response.status).json(response.body);
    } catch (err) {
        console.error('Error while getting user info:', err.message);
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
    activateUser,
    deactivateUser,
    blockUser,
    validateUserSession,
    getUsers,
    getUserInfo,
};
