const express = require("express");
const mangoose = require("mongoose");

const app = express();
const { PORT = 3001 } = process.env;

mangoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(console.error);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
