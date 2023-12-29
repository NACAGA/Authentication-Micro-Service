const express = require('express');
const router = express.Router();
const userAuthenticationController = require('../controllers/userAuthentication.controller');

/* POST create user. */
router.post('/create-user', userAuthenticationController.createUser);

/* POST login user. */
router.post('/login-user', userAuthenticationController.loginUser);

/* DELETE delete user. */
router.delete('/delete-user', userAuthenticationController.deleteUser);

/* PATCH change username. */
router.patch('/change-username', userAuthenticationController.changeUsername);

/* PATCH change password. */
router.patch('/change-password', userAuthenticationController.changePassword);

/* PATCH change user info. */
router.patch('/change-user-info', userAuthenticationController.changeUserInfo);

/* PATCH change user status. */
router.patch('/change-user-status', userAuthenticationController.changeUserStatus);

/* POST logout user. */
router.post('/logout-user', userAuthenticationController.logoutUser);

/* POST validate user session. */
router.post('/validate-user-session', userAuthenticationController.validateUserSession);

module.exports = router;
