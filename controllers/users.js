const User = require("../models/user");

// Get all users and return an array to the users or the cleint
const getUsers = (req, res) => {
  console.log("getUsers controller");
  User.find({})
    .then((users) => res.send(users))
    .ctach((err) => res.status(500).send({ message: err.message }));
};

module.exports = {
  getUsers,
};
