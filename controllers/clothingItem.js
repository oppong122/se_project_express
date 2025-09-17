const ClothingItem = require("../models/clothingItem");
const STATUS = require("../utils/constant");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl })
    .then((item) => {
      console.log(item);
      res.status(STATUS.CREATED).send({ data: item });
    })
    .catch((err) => {
      console.log(err);
      res.status(STATUS.INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => {
      res.status(STATUS.OK).send(items);
    })
    .catch((err) => {
      console.log(err);
      res.status(STATUS.INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;
  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageURL } })
    .orFail()
    .then((item) => {
      res.status(STATUS.OK).send(item);
    })
    .catch((err) => {
      console.log(err);
      res.status(STATUS.INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => {
      res.status(STATUS.DELETE_SUCCESS).send(item);
    })
    .catch((err) => {
      console.log(err);
      res.status(STATUS.INTERNAL_SERVER_ERROR).send({ message: err.message });
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
      console.log(err);
      if (err.name === "DocumentNotFounder") {
        return res.status(STATUS.NOT_FOUND).send({ message: err.message });
      } else if (err.name === "CastError") {
        return res.status(STATUS.BAD_REQUEST).send({ message: err.message });
      }
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
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
      console.log(err);
      if (err.name === "DocumentNotFounder") {
        return res.status(STATUS.NOT_FOUND).send({ message: err.message });
      } else if (err.name === "CastError") {
        return res.status(STATUS.BAD_REQUEST).send({ message: err.message });
      }
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  disLikeItem,
};
