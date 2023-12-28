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
router.patch('/change-username', userAuthenticationController.changeUsername);

/* PUT change password. */
router.patch('/change-password', userAuthenticationController.changePassword);

router.patch('/change-user-info', userAuthenticationController.changeUserInfo);

router.put('/change-user-status', userAuthenticationController.changeUserStatus);

module.exports = router;
