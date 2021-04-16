const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  const token = req.header("Authorization");
  // const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "access token not found" });
  try {
    const decoded = jwt.verify(token, "skfhdjshdksf");

    req.userId = decoded.userId;
    // console.log(req.userId);
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false, message: "invalid token" });
  }
};
module.exports = auth;
