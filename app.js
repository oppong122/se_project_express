const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const errorHandler = require("./middlewares/error-handler");

const app = express();
const { PORT = 3001 } = process.env;

const mainRouter = require("./routes/index");

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.error("Connected to MongoDB");
  })
  .catch(console.error);

app.use(cors());
app.use(express.json());

app.use(requestLogger);
app.use("/", mainRouter);
app.use(errorLogger);

// Celebrate handler
app.use(errors());

// our centralized handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.error(`App listening on port ${PORT}`);
});
