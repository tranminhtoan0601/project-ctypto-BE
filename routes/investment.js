const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const InvestmentController = require("../controllers.js/investmentController");

router.get("/", auth, InvestmentController.show);

router.post("/addInvestment", auth, InvestmentController.addInvestment);

module.exports = router;
