require("dotenv").config();
const express = require("express");

const port = process.env.PORT_1 || 8000;
const cors = require("cors");

const app = express();
app.use(cors());

app.listen(port, () => {
  console.log(`port listed on port number : ${port}!`);
});
