const express = require('express');
const router = express.Router();
const userAuthenticationController = require('../controllers/userAuthentication.controller');
const { ro } = require('date-fns/locale');

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

/* POST logout user. */
router.post('/logout-user', userAuthenticationController.logoutUser);

/* POST validate user session. */
router.post('/validate-user-session', userAuthenticationController.validateUserSession);

/* POST activate user. */
router.post('/activate-user', userAuthenticationController.activateUser);

/* POST deactivate user. */
router.post('/deactivate-user', userAuthenticationController.deactivateUser);

/* POST block user. */
router.post('/block-user', userAuthenticationController.blockUser);

/* GET get users. */
router.get('/get-users', userAuthenticationController.getUsers);

/* GET get user info. */
router.get('/get-user-info', userAuthenticationController.getUserInfo);

module.exports = router;
