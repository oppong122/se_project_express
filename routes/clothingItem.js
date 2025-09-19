const router = require("express").Router();

const {
  createItem,
  getItems,

  deleteItem,
  likeItem,
  disLikeItem,
} = require("../controllers/clothingItem");

// CRUD

// Get Clothing items
router.get("/", getItems);

// Creating items
router.post("/", createItem);

// Update Clothing items
// router.put("/:itemId", updateItem);

// Deleting clothig items
router.delete("/:itemId", deleteItem);

// Like Clothing Items
router.put("/:itemId/likes", likeItem);

// Disli ke clothing Items
router.delete("/:itemId/likes", disLikeItem);

module.exports = router;
