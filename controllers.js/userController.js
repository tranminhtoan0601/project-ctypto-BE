const User = require("../models/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const sendMail = require("./sendMail");
const sendEmail = require("./sendMail");
const UserController = {
  register: async (req, res) => {
    const { email, password, username } = req.body;
    if (!email || !password || !username)
      return res.json({
        success: false,
        message: "missing email or password or username",
      });
    if (!validateEmail(email))
      return res
        .status(400)
        .json({ success: false, message: "Invalid emails " });
    if (password.length < 6)
      return res.status(400).json({
        success: false,
        message: "password must be at least 6 character",
      });
    try {
      //check for exitsting user
      const user = await User.findOne({ email });

      if (user)
        return res.json({ success: false, message: "email already taken" });
      const hashedPassword = await argon2.hash(password);
      const newUser = new User({ email, password: hashedPassword, username });

      await newUser.save();

      //return token
      const activation_token = jwt.sign(
        { userId: newUser._id },
        "skfhdjshdksf"
      );
      const url = `http://localhost:3000/api/auth/activate/${activation_token}`;

      res.json({
        success: true,
        message: "user created successful",
        activation_token,
      });
    } catch (error) {
      console.log(error);
      res.status({ success: false, message: "internal server error" });
    }
  },

  login: async (req, res) => {
    const { email, password, username } = req.body;
    if (!email || !password || !username)
      return res.json({
        success: false,
        message: "missing usename or password or email",
      });
    if (!validateEmail(email))
      return res
        .status(400)
        .json({ success: false, message: "Invalid emails " });
    if (password.length < 6)
      return res.status(400).json({
        success: false,
        message: "password must be at least 6 character",
      });
    try {
      //check for exitsting user
      const user = await User.findOne({ email, username });
      if (!user)
        return res
          .status(400)
          .json({ success: false, message: "Incorect email or username  " });
      //email fourd
      const passwordValid = await argon2.verify(user.password, password);

      if (!passwordValid)
        return res
          .status(400)
          .json({ success: false, message: "Incorect password " });
      // all good
      // return token
      const activation_token = jwt.sign({ userId: user._id }, "skfhdjshdksf");

      res.json({
        success: true,
        message: "user logined in successful",
        activation_token,
      });
    } catch (error) {
      console.log(error);
      res.status({ success: false, message: "internal server error" });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ success: false, message: "this email do not exit" });
      const access_token = jwt.sign({ userId: user._id }, "skfhdjshdksf");
      const url = `http://localhost:3000/api/auth/reset/${access_token}`;
      sendEmail(email, url, "RESET YOUR PASSWORD");
      res.json({
        message: "re-send the  password, please check your password ",
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password } = req.body;
      const hashedPassword = await argon2.hash(password);
      const respone = await User.findOneAndUpdate(
        { _id: req.userId },
        { password: hashedPassword }
      );
      if (!respone)
        return res
          .status(400)
          .json({ success: false, message: "Incorect email  " });
      res.json({ message: "password successfully changed" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
};

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
module.exports = UserController;
