const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema({
  title: {
    type: String,
    require: true,
    // unique: true,
  },
  description: {
    type: String,
  },
  entryFrom: {
    type: Number,
  },
  entryTo: {
    type: Number,
  },
  stop: {
    type: Number,
  },
  tp: {
    type: Schema.Types.Array,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("posts", PostSchema);
