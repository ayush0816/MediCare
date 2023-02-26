const express = require("express");
const connectToMongo = require("./db");

connectToMongo();
const app = express();
const port = 3000;

app.use(express.json());
app.use("/api/auth", require("./routes/users.js"));
app.use("/api/buyer", require("./routes/buyer.js"));

app.listen(port, () => {
  console.log("kudos! App is up and running at port", port);
});
