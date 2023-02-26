const express = require("express");
const user = require("../models/user.js");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  const token = jwt.sign({ id: user._id }, "ayushsingh");
  res.send(token);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).send({ err: "invalid email or pass" });

  const cmp = bcrypt.compare(password, user.password);
  if (!cmp) return res.status(400).send({ err: "invalid email or pass" });
  const token = jwt.sign({ id: user._id }, "ayushsingh");
  res.send(token);
});

router.patch("/update", auth, async (req, res) => {
  const update = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "email",
    "password",
    "ventilator_cnt",
    "phone_no",
  ];
  const isvalidUpdate = update.every((updat) => allowedUpdates.includes(updat));
  if (!isvalidUpdate) {
    return res.status(404).send("Invalid Updates");
  }
});
module.exports = router;
