const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  validateItemId,
  validateCreateClothingItem,
} = require("../middlewares/validator");

const {
  createClothingItem,
  deleteItem,
  likeItem,
  disLikeItem,
} = require("../controllers/clothingItem");

router.use(auth);
router.post("/", validateCreateClothingItem, createClothingItem);
router.delete("/:itemId", validateItemId, deleteItem);
router.put("/:itemId/likes", validateItemId, likeItem);
router.delete("/:itemId/likes", validateItemId, disLikeItem);

module.exports = router;
