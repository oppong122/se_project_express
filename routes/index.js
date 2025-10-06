const router = require("express").Router();
const STATUS = require("../utils/constant");

const clothingItemRouter = require("./clothingItem");
const userRouter = require("./users");
// const auth = require("../middlewares/auth");

// Protected Routes
// router.use(auth);
router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.use((req, res) => {
  res.status(STATUS.NOT_FOUND).send({ message: "Router not found" });
});

module.exports = router;
