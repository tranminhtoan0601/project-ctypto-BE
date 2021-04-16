const express = require("express");

const mongoose = require("mongoose");

require("dotenv").config();

const cors = require("cors");

const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const investmentRouter = require("./routes/investment");

const app = express();

const connectDB = async function () {
  try {
    await mongoose.connect("mongodb://localhost:27017/project-mern", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("connect successfully!!");
  } catch (error) {
    console.log("connect fail!!");
  }
};
connectDB();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/posts", postRouter);
app.use("/investments", investmentRouter);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
