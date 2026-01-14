const router = require("express").Router();
const auth = require("../middlewares/auth");
const { validateItemId } = require("../middlewares/validator");

const {
  deleteItem,
  likeItem,
  disLikeItem,
} = require("../controllers/clothingItem");

router.use(auth);

router.delete("/:itemId", validateItemId, deleteItem);
router.put("/:itemId/likes", validateItemId, likeItem);
router.delete("/:itemId/likes", validateItemId, disLikeItem);

module.exports = router;
