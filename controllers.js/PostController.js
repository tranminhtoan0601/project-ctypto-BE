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
};

module.exports = PostController;
