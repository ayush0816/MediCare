const express = require("express");
const user = require("../models/user.js");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

router.post("/createUser", async (req, res) => {
  const { category, name, email, password, phone_no, ventilator_cnt } =
    req.body;

  const check = await User.findOne({ email: email });
  if (check) return res.status(400).send({ err: "Already registerd mail" });
  const pass = await bcrypt.hash(password, 10);
  const user = new User({
    category: category,
    name: name,
    email: email,
    phone_no: phone_no,
    password: pass,
    ventilator_cnt: ventilator_cnt,
  });
  await user.save();
  res.send(user);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).send({ err: "invalid email or pass" });

  const cmp = bcrypt.compare(password, user.password);
  if (!cmp) return res.status(400).send({ err: "invalid email or pass" });

  res.send(user);
});
module.exports = router;
