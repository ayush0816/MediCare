const express = require("express");
const connectToMongo = require("./db");
const dotenv = require("dotenv");
connectToMongo();
dotenv.config({ path: "./config/config.env" });
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/api/auth", require("./routes/users.js"));
app.use("/api/buyer", require("./routes/buyer.js"));

app.listen(port, () => {
  console.log("kudos! App is up and running at port", port);
});
