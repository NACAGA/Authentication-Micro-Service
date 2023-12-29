const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
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
router.delete('/delete-user', [validateRequestBody(['username']), body('username').isString()], userAuthenticationController.deleteUser);

/* PATCH change username. */
router.patch(
    '/change-username',
    [
        validateRequestBody(['username', 'new_username', 'sessionToken']),
        body('username').isString(),
        body('new_username').isString(),
        body('sessionToken').isString(),
    ],
    userAuthenticationController.changeUsername
);

/* PATCH change password. */
router.patch(
    '/change-password',
    [
        validateRequestBody(['username', 'new_password', 'sessionToken']),
        body('username').isString(),
        body('new_password').isString(),
        body('sessionToken').isString(),
    ],
    userAuthenticationController.changePassword
);

/* PATCH change user info. */
router.patch(
    '/change-user-info',
    [validateRequestBody(['username', 'new_fields', 'sessionToken']), body('username').isString(), body('sessionToken').isString()],
    userAuthenticationController.changeUserInfo
);

/* POST logout user. */
router.post('/logout-user', [validateRequestBody('username'), body('username').isString()], userAuthenticationController.logoutUser);

/* POST validate user session. */
router.post(
    '/validate-user-session',
    [validateRequestBody(['username', 'sessionToken']), body('username').isString(), body('sessionToken').isString()],
    userAuthenticationController.validateUserSession
);

/* POST activate user. */
router.post('/activate-user', [validateRequestBody(['username']), body('username').isString()], userAuthenticationController.activateUser);

/* POST deactivate user. */
router.post(
    '/deactivate-user',
    [validateRequestBody(['username']), body('username').isString()],
    userAuthenticationController.deactivateUser
);

/* POST block user. */
router.post('/block-user', [validateRequestBody(['username']), body('username').isString()], userAuthenticationController.blockUser);

/* GET get users. */
router.get('/get-users', [validateRequestBody(['fields']), body('fields').isObject()], userAuthenticationController.getUsers);

/* GET get user info. */
router.get('/get-user-info', [validateRequestBody(['username']), body('username').isString()], userAuthenticationController.getUserInfo);

module.exports = router;
