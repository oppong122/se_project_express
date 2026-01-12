const router = require("express").Router();
const STATUS = require("../utils/constant");

const clothingItemRouter = require("./clothingItem");
const userRouter = require("./users");
const auth = require("../middlewares/auth");
const { validateLogin, validateSignup } = require("../middlewares/validator");

const { login, createUser } = require("../controllers/users");
const { getItems } = require("../controllers/clothingItem");

router.post("/signin", validateLogin, login);
router.post("/signup", validateSignup, createUser);

router.use(auth);
router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.use((req, res) => {
  res.status(STATUS.NOT_FOUND).send({ message: "Router not found" });
});

module.exports = router;
