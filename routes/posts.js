const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const PostController = require("../controllers.js/PostController");

router.get("/", auth, PostController.show);

router.post("/addPost", auth, PostController.addPost);

module.exports = router;
