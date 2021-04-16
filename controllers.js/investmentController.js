const Investment = require("../models/Investments");

const InvestmentController = {
  show: async (req, res) => {
    try {
      const investments = await Investment.find({
        userId: req.userId,
      }).populate("trackId");
      res.json({ success: true, investments });
    } catch (error) {
      console.log(error);
      res.status({ success: false, message: "internal server error" });
    }
  },
  addInvestment: async (req, res) => {
    const { id } = req.body;
    console.log(id);
    try {
      const newInvest = new Investment({
        trackId: id,
        userId: req.userId,
      });
      await newInvest.save();
      res.json({
        success: true,
        message: "Happy ",
        newInvest: newInvest,
      });
    } catch (error) {
      console.log(error);
      res.status({ success: false, message: "internal server error" });
    }
  },
};

module.exports = InvestmentController;
