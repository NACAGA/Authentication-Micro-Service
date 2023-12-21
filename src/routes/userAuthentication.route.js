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

module.exports = router;
