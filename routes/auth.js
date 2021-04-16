const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const UserController = require("../controllers.js/userController");

router.post("/register", UserController.register);

router.post("/login", UserController.login);

router.post("/forgotPassword", UserController.forgotPassword);

router.post("/resetPassword", auth, UserController.resetPassword);

module.exports = router;
