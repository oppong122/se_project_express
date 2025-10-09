const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const { PORT = 3001 } = process.env;
const { login, createUser } = require("./controllers/users");
const { getItems } = require("./controllers/clothingItem");
const mainRouter = require("./routes/index");

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.error("Connected to MongoDB");
  })
  .catch(console.error);

app.use(cors());
app.use(express.json());

app.post("/signin", login);
app.post("/signup", createUser);
app.get("/", getItems);

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.error(`App listening on port ${PORT}`);
});
