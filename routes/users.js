const express = require("express");
const user = require("../models/user.js");
const router = express.Router();
const User = require("../models/user.js");

router.post("/createUser", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user);
});

module.exports = router;
