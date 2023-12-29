const express = require('express');
const router = express.Router();
const userAuthenticationController = require('../controllers/userAuthentication.controller');

/* POST create user. */
router.post('/create-user', userAuthenticationController.createUser);

/* POST login user. */
router.post('/login-user', userAuthenticationController.loginUser);

/* DELETE delete user. */
router.delete('/delete-user', userAuthenticationController.deleteUser);

/* PUT change username. */
router.put('/change-username', userAuthenticationController.changeUsername);

/* PUT change password. */
router.put('/change-password', userAuthenticationController.changePassword);

/* PUT change user info. */
router.put('/change-user-info', userAuthenticationController.changeUserInfo);

/* POST logout user. */
router.post('/logout-user', userAuthenticationController.logoutUser);

module.exports = router;
