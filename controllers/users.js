const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const STATUS = require("../utils/constant");
const { JWT_SECRET } = require("../utils/config");

// Creating user
const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  if (!name || !avatar || !email || !password) {
    return res
      .status(STATUS.BAD_REQUEST)
      .send({ message: "name, avatar, email and password are required" });
  }
  return bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({
        name,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) =>
      res.status(STATUS.CREATED).send({
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      })
    )
    .catch((err) => {
      console.error(err);
      if (err.code === 11000) {
        return res
          .status(STATUS.CONFLICT)
          .send({ message: "Conflict error occured" });
      }
      if (err.name === "ValidationError") {
        return res
          .status(STATUS.BAD_REQUEST)
          .send({ message: "Cleint sent invalid data" });
      }
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// getting users by id

const getCurrentUser = (req, res) => {
  const { _id: userId } = req.user;
  return User.findById(userId)
    .orFail()
    .then((user) => {
      res.status(STATUS.OK).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(STATUS.NOT_FOUND)
          .send({ message: "Resource not found" });
      }
      if (err.name === "CastError") {
        return res
          .status(STATUS.BAD_REQUEST)
          .send({ message: "Cleint sent invalid data" });
      }
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// User login
const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(STATUS.BAD_REQUEST)
      .send({ message: "Email and password are required " });
  }
  //   const normailizedEmail = String(email).toLowerCase().trim();

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // creating the token with only user._id

      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(STATUS.OK).send({ token });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(STATUS.UNAUTHORIZED)
        .send({ message: "Incorrect email or password" });
    });
};

// updating Current user
const updateCurrentUser = (req, res) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  const update = {};
  if (typeof name === "string") {
    update.name = name;
  }
  if (typeof avatar === "string") {
    update.avatar = avatar;
  }

  return User.findByIdAndUpdate(userId, update, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((user) => {
      res.status(STATUS.OK).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(STATUS.BAD_REQUEST)
          .send({ message: "Invalid data for profile update" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(STATUS.NOT_FOUND)
          .send({ message: "Resource not found" });
      }
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = {
  createUser,
  getCurrentUser,
  login,
  updateCurrentUser,
};
