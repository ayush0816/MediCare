const express = require("express");
const user = require("../models/user.js");
const router = express.Router();
const User = require("../models/user.js");

router.post("/createUser", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).send({ err: "invalid email or pass" });

  if (user.password !== password)
    return res.status(400).send({ err: "invalid email or pass" });

  res.send(user);
});
module.exports = router;
