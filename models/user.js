const mangoose = require("mongoose");
const validator = require("validator");
const { validate } = require("./clothingItem");

const userSchema = new mangoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
});

module.exports = mangoose.model("user", userSchema);
