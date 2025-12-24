const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const STATUS = require("../utils/constant");
const { JWT_SECRET } = require("../utils/config");
const { BadRequestError, NotFoundError, ConflictError } = require("../errors");

// Creating user
const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  if (!name || !avatar || !email || !password) {
    return next(
      new BadRequestError("name, avatar, email and password are required")
    );
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
        return next(new ConflictError("User's email already exist"));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Cleint sent invalid data"));
      }
      return next(err);
    });
};

// getting users by id

const getCurrentUser = (req, res, next) => {
  const { _id: userId } = req.user;
  return User.findById(userId)
    .orFail()
    .then((user) => {
      res.status(STATUS.OK).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Resource not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Cleint sent invalid data"));
      }
      return next(err);
    });
};

// User login
const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new BadRequestError("Email and password are required"));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // creating the token with only user._id

      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(STATUS.OK).send({ token });
    })
    .catch(() => {
      next(new NotFoundError("Incorrect email or password"));
    });
};

// updating Current user
const updateCurrentUser = (req, res, next) => {
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
        return next(new BadRequestError("Invalid data for profile update"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Resource not found"));
      }
      return next(err);
    });
};

module.exports = {
  createUser,
  getCurrentUser,
  login,
  updateCurrentUser,
};
