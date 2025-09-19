const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.error("Connected to MongoDB");
  })
  .catch(console.error);

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133",
  };
  console.error("Middleware injected user", req.user);
  next();
});
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.error(`App listening on port ${PORT}`);
});
