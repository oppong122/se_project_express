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
  .connect("mongodb://127.0.0.1:27017/wtwr_db") //136.119.121.238
  .then(() => {
    console.error("Connected to MongoDB");
  })
  .catch(console.error);

const allowedOrigins = [
  "http://localhost:3000",
  "https://api.wtwr-demonstration.chickenkiller.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running" });
});

app.use(express.json());

//Crash test
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

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
