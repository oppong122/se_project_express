const User = require("../models/user");
const STATUS = require("../utils/constant");

// Get all users and return an array to the users or the cleint
const getUsers = (req, res) => {
  console.log("getUsers controller");
  User.find({})
    .then((users) => {
      res.status(STATUS.OK).send(users);
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    });
};

//Creating user
const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(STATUS.CREATED).send(user))
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        return res.status(STATUS.BAD_REQUEST).send({ message: err.message });
      }
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    });
};

//getting users by id

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById()
    .orFail()
    .then((user) => {
      res.status(STATUS.OK).send(user);
    })
    .ctach((err) => {
      console.log(err);
      if (err.name === "DocumentNotFounder") {
        return res.status(STATUS.NOT_FOUND).send({ message: err.message });
      } else if (err.name === "CastError") {
        return res.status(STATUS.BAD_REQUEST).send({ message: err.message });
      }
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    });
};

module.exports = {
  getUsers,
  createUser,
  getUser,
};
