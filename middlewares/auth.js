const { JWT_SECRET } = require("../utils/config");
const STATUS = require("../utils/constant");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers; // getting the authentication from the header

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(STATUS.UNAUTHORIZED)
      .send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
  } catch (err) {
    return res
      .status(STATUS.UNAUTHORIZED)
      .send({ message: "Authorization required" });
  }

  next();
};
