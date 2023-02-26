const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: "false",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendWelcomeMail = function (email) {
  var mailOptions = {
    from: "jujutsuxxy2901@gmail.com",
    to: email,
    subject: "Welcome to our family of medicare",
    text: "We on behalf of medicare limited heartily welcome you in our family.",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const Notification_of_buyers = function (email_List, buyers_email, buyers_cnt) {
  var mailOptions = {
    from: "jujutsuxxy2901@gmail.com",
    to: email_List,
    subject: "Notification of new requirement",
    text:
      "Its to inform you that a buyer with" +
      buyers_email.toString() +
      " requires " +
      buyers_cnt.toString() +
      " ventilator.",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent:");
    }
  });
};

const Notification_of_sellers = function (
  email_List,
  seller_email,
  seller_cnt
) {
  var mailOptions = {
    from: "jujutsuxxy2901@gmail.com",
    to: email_List,
    subject: "Notification for ventilators availabity",
    text:
      "Its to inform you that a seller with" +
      seller_email.toString() +
      " has " +
      seller_cnt.toString() +
      " ventilators. If you require ventilators kindly contact this seller",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent:");
    }
  });
};

module.exports = {
  sendWelcomeMail,
  Notification_of_buyers,
  Notification_of_sellers,
};
