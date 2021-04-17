const Post = require("../models/Post");

const PostController = {
  show: async (req, res) => {
    try {
      const posts = await Post.find().populate("user", ["username"]);
      res.json({ success: true, posts });
    } catch (error) {
      console.log(error);
      res.status({ success: false, message: "internal server error" });
    }
  },
  addPost: async (req, res) => {
    const { title, description, entryFrom, entryTo, stop, tp } = req.body;
    const { userId } = req;
    // console.log(userId);

    try {
      const newPost = new Post({
        title,
        description,
        entryFrom,
        entryTo,

        stop,
        tp,
        user: req.userId,
      });
      await newPost.save();
      res.json({ success: true, message: "Happy learning", post: newPost });
    } catch (error) {
      console.log(error);
      res.status({ success: false, message: "internal server error" });
    }
  },
  updatePost: async (req, res) => {
    const { title, description, entryFrom, entryTo, stop, tp } = req.body;

    try {
      const postUpdatedCondition = { _id: req.params.id, user: req.userId };
      const updatedpost = await Post.findOneAndUpdate(
        postUpdatedCondition,
        req.body,
        { new: true }
      );
      if (!updatedpost)
        return res
          .status(401)
          .json({ success: false, message: "post not found" });
      res.json({
        success: true,
        message: "excellent progress",
        post: updatedpost,
      });
    } catch (error) {
      console.log(error);
      res.status({ success: false, message: "internal server error" });
    }
  },
  deletePost: async (req, res) => {
    try {
      const postDeleteCondition = { _id: req.params.id, user: req.userId };
      const deletePost = await Post.findOneAndDelete(postDeleteCondition);

      //user not authorize or not found post
      if (!deletePost)
        return res
          .status(401)
          .json({ success: false, message: "post not found" });
      res.json({
        success: true,
        post: deletePost,
      });
    } catch (error) {
      console.log(error);
      res.status({ success: false, message: "internal server error" });
    }
  },
};

module.exports = PostController;
