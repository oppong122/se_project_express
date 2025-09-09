const router = require("express").Router();
const { getUsers } = require("../controllers/users");

router.get("/", getUsers);

router.get("/:userId", (req, res) => {
  console.log("Get users by id");
});
router.post("/", (req, res) => {
  console.log("Create user");
});

module.exports = router;
