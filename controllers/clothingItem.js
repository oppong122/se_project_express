const ClothingItem = require("../models/clothingItem");
const STATUS = require("../utils/constant");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      console.error(item);
      res.status(STATUS.CREATED).send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(STATUS.BAD_REQUEST)
          .send({ message: "Cleint sent invalid data" });
      }
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => {
      res.status(STATUS.OK).send(items);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        return res
          .status(STATUS.FORBIDDEN)
          .send({ message: "You cannot delete someone else's item" });
      }
      return item
        .findByIdAndDelete(itemId)
        .then(() => res.send({ message: "Item deleted successfully" }));
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(STATUS.BAD_REQUEST)
          .send({ message: "Cleint sent invalid data" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(STATUS.NOT_FOUND)
          .send({ message: "Resource not found" });
      }
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const likeItem = (req, res) => {
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
        return res
          .status(STATUS.NOT_FOUND)
          .send({ message: "Resource not found" });
      }
      if (err.name === "CastError") {
        return res
          .status(STATUS.BAD_REQUEST)
          .send({ message: "Cleint sent invalid data" });
      }
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const disLikeItem = (req, res) => {
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
        return res
          .status(STATUS.NOT_FOUND)
          .send({ message: "Resource not found" });
      }
      if (err.name === "CastError") {
        return res
          .status(STATUS.BAD_REQUEST)
          .send({ message: "Cleint sent invalid data" });
      }
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  disLikeItem,
};
