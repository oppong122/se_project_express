const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  validateCreateClothingItems,
  validateItemId,
} = require("../middlewares/validator");

const {
  createClothingItem,
  getItems,

  deleteItem,
  likeItem,
  disLikeItem,
} = require("../controllers/clothingItem");

router.get("/", getItems);

router.use(auth);
router.post("/", validateCreateClothingItems, createClothingItem);
router.delete("/:itemId", validateItemId, deleteItem);
router.put("/:itemId/likes", validateItemId, likeItem);
router.delete("/:itemId/likes", validateItemId, disLikeItem);

module.exports = router;
