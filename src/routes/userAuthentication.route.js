const express = require('express');
const router = express.Router();
const { body, headers } = require('express-validator');
const userAuthenticationController = require('../controllers/userAuthentication.controller');

const validateRequestBody = (expectedFields) => {
    return (req, res, next) => {
        const missingFields = expectedFields.filter((field) => !(field in req.body));

        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing fields: ${missingFields.join(', ')}`,
            });
        }

        next();
    };
};

validateRequestHeaders = (expectedFields) => {
    return (req, res, next) => {
        const missingFields = expectedFields.filter((field) => !(field in req.headers));

        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing fields: ${missingFields.join(', ')}`,
            });
        }

        next();
    };
};

/* POST create user. */
router.post(
    '/create-user',
    [validateRequestBody(['username', 'password']), body('username').isString(), body('password').isString()],
    userAuthenticationController.createUser
);

/* POST login user. */
router.post(
    '/login-user',
    [validateRequestBody(['username', 'password']), body('username').isString(), body('password').isString()],
    userAuthenticationController.loginUser
);

/* DELETE delete user. */
router.delete('/delete-user', [validateRequestBody(['id']), body('id').isInt()], userAuthenticationController.deleteUser);

/* PATCH change username. */
router.patch(
    '/change-username',
    [validateRequestBody(['id', 'new_username', 'token']), body('id').isInt(), body('new_username').isString(), body('token').isString()],
    userAuthenticationController.changeUsername
);

/* PATCH change password. */
router.patch(
    '/change-password',
    [validateRequestBody(['id', 'new_password', 'token']), body('id').isInt(), body('new_password').isString(), body('token').isString()],
    userAuthenticationController.changePassword
);

/* PATCH change user info. */
router.patch(
    '/change-user-info',
    [validateRequestBody(['id', 'new_fields', 'token']), body('id').isInt(), body('token').isString()],
    userAuthenticationController.changeUserInfo
);

/* POST validate user session. */
router.post(
    '/validate-user-session',
    [validateRequestBody(['token']), body('token').isString()],
    userAuthenticationController.validateUserSession
);

/* POST activate user. */
router.post('/activate-user', [validateRequestBody(['id']), body('id').isInt()], userAuthenticationController.activateUser);

/* POST deactivate user. */
router.post('/deactivate-user', [validateRequestBody(['id']), body('id').isInt()], userAuthenticationController.deactivateUser);

/* POST block user. */
router.post('/block-user', [validateRequestBody(['id']), body('id').isInt()], userAuthenticationController.blockUser);

/* GET get users. */
router.get('/get-users', [validateRequestBody(['fields']), body('fields').isObject()], userAuthenticationController.getUsers);

/* GET get user info. */
router.get('/get-user-info', [validateRequestBody(['id']), body('id').isInt()], userAuthenticationController.getUserInfo);

module.exports = router;
