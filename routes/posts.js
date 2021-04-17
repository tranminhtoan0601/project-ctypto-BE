const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const PostController = require("../controllers.js/PostController");

router.get("/", auth, PostController.show);

router.post("/addPost", auth, PostController.addPost);

router.put("/updatePost/:id", auth, PostController.updatePost);

router.delete("/deletePost/:id", auth, PostController.deletePost);

module.exports = router;
