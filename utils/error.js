const mangoose = require("mongoose");

const userSchema = new mangoose.Schema({});

module.exports = mangoose.model("user", userSchema);
