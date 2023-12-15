const express = require("express");
const router = express.Router();
const userAuthenticationController = require("../controllers/userAuthentication.controller");

/* POST create user. */
router.post("/create-user", userAuthenticationController.createUser);

module.exports = router;
