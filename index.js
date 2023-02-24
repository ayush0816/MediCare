const express = require("express");
const connectToMongo = require("./db");

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log("kudos! App is up and running at port", port);
});
