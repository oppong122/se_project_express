const BadRequestError = require("./BadRequestError");
const ConflictError = require("./ConcflictError");
const ForbidenError = require("./ForbidenError");
const NotFoundError = require("./NotFoundError");
const UnauthorizedError = require("./UnauthorizedError");

module.exports = {
  BadRequestError,
  ConflictError,
  ForbidenError,
  NotFoundError,
  UnauthorizedError,
};
