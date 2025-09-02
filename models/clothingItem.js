const mangoose = require("mongoose");

const clothingItemSchema = new mangoose.Schema({});

module.exports = mangoose.model("clothingItem", clothingItemSchema);
