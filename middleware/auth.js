const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) {
      throw new Error();
    }
    const decodeToken = jwt.verify(token, "ayushsingh");
    console.log(decodeToken.id);
    const user1 = await UserModel.findOne({ _id: decodeToken.id });
    if (!user1) {
      throw new Error();
    }
    req.user = user1;
    next();
  } catch (e) {
    res.status(401).send("Please Authenticate");
  }
};
module.exports = auth;
