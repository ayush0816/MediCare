const express = require("express");
const user = require("../models/user.js");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const sendMail = require("../sendMail.js");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

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
  sendMail.sendWelcomeMail(req.body.email);
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
  try {
    update.forEach(async (updat) => {
      req.user[updat] = req.body[updat];
      if (updat == allowedUpdates[3] && req.user.category == "buyer") {
        const sellersList1 = [];
        const sellersList = await User.find({ category: "seller" });
        for (var i in sellersList) {
          sellersList1.push(sellersList[i].email);
        }
        sendMail.Notification_of_buyers(
          sellersList1,
          req.user.email,
          req.body[updat]
        );
      } else if (updat == allowedUpdates[3] && req.user.category == "seller") {
        const buyersList1 = [];
        const buyersList = await User.find({ category: "buyer" });
        for (var i in buyersList) {
          buyersList1.push(buyersList[i].email);
        }
        sendMail.Notification_of_sellers(
          buyersList1,
          req.user.email,
          req.body[updat]
        );
      }
    });
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(404).send(e);
  }
});
module.exports = router;
