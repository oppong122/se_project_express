const router = require("express").Router();
const STATUS = require("../utils/constant");

const clothingItemRouter = require("./clothingItem");
const userRouter = require("./users");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.use((req, res) => {
  res
    .status(STATUS.INTERNAL_SERVER_ERROR)
    .send({ message: "Router not found" });
});

module.exports = router;
