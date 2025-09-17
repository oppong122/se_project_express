const mangoose = require("mongoose");
const validator = require("validator");

const clothingItemSchema = new mangoose.Schema({
  name: {
    type: String,
    require: true,
  },
  weather: {
    type: String,
    require: true,
  },
  imageUrl: {
    type: String,
    require: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "link is not valid",
    },
  },
  owner: {
    type: mangoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mangoose.model("clothingItem", clothingItemSchema);
