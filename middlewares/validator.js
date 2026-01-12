const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helper) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helper.error("string.uri");
};

const objectId = Joi.string().hex().length(24);

module.exports.validateCreateClothingItems = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    weather: Joi.string().required(),
    imageUrl: Joi.string().custom(validateURL).required(),
  }),
});

module.exports.validateSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().custom(validateURL).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().custom(validateURL).required(),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.validateUserId = celebrate({
  params: Joi.object().keys({
    id: objectId,
  }),
});

module.exports.validateItemId = celebrate({
  params: Joi.object().keys({
    itemId: objectId,
  }),
});
