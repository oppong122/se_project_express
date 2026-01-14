const router = require("express").Router();
const STATUS = require("../utils/constant");

const clothingItemRouter = require("./clothingItem");
const userRouter = require("./users");
const { getItems, createClothingItem } = require("../controllers/clothingItem");
const {
  validateLogin,
  validateSignup,
  validateCreateClothingItems,
} = require("../middlewares/validator");

const { login, createUser } = require("../controllers/users");

router.get("/", getItems);
router.post("/", validateCreateClothingItems, createClothingItem);
router.post("/signin", validateLogin, login);
router.post("/signup", validateSignup, createUser);

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.use((req, res) => {
  res.status(STATUS.NOT_FOUND).send({ message: "Router not found" });
});

module.exports = router;
