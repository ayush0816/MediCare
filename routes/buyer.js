const express = require("express");
const router = express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");

router.get("/requirements", auth, async (req, res) => {
  try {
    const unit = req.query.unit;
    const sellersList1 = [];
    const sellersList = await User.find({ category: "seller" });
    for (var i in sellersList) {
      var objectUser = sellersList[i].toObject();
      delete objectUser.password;
      if (sellersList[i].ventilator_cnt >= unit) {
        sellersList1.push(objectUser);
      }
    }
    req.user.ventilator_cnt = unit;
    await req.user.save();

    if (!sellersList1)
      return res.send(
        "Currently No seller is available. We will get back to you as soon as we get your requirement.Please keep checking mails for updates"
      );
    res.send(sellersList1);
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = router;
