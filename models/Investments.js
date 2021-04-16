const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const InvestmentSchema = new Schema({
  trackId: {
    type: Schema.Types.ObjectId,
    ref: "posts",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("investments", InvestmentSchema);
