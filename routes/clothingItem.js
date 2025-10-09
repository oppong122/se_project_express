const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  createItem,
  getItems,

  deleteItem,
  likeItem,
  disLikeItem,
} = require("../controllers/clothingItem");

// CRUD

router.get("/", getItems);

router.use(auth);
router.post("/", createItem);
router.delete("/:itemId", deleteItem);
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", disLikeItem);

module.exports = router;
