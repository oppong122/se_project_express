const ClothingItem = require("../models/clothingItem");
const STATUS = require("../utils/constant");
const { BadRequestError, NotFoundError, ForbiddenError } = require("../errors");

const createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      console.error(item);
      res.status(STATUS.CREATED).send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Cleint sent invalid data"));
      }
      return next(err);
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => {
      res.status(STATUS.OK).send(items);
    })
    .catch(() => {
      next(new NotFoundError("Incorrect email or password"));
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        return next(
          new ForbiddenError("You cannot delete someone else's item")
        );
      }
      return ClothingItem.deleteOne({ _id: itemId }).then(() =>
        res.send({ message: "Item deleted successfully" })
      );
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Resource not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Cleint sent invalid data"));
      }
      return next(err);
    });
};

const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      res.status(STATUS.OK).send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Resource not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Cleint sent invalid data"));
      }
      return next(err);
    });
};

const disLikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      res.status(STATUS.OK).send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Resource not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Cleint sent invalid data"));
      }
      return next(err);
    });
};

module.exports = {
  createClothingItem,
  getItems,
  deleteItem,
  likeItem,
  disLikeItem,
};
