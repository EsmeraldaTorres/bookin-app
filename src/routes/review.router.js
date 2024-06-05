const {
  getAll,
  create,
  getOne,
  remove,
  update,
} = require("../controllers/review.controller");
const express = require("express");
const verifyJWT = require("../utils/verifyJWT");

const reviewRouter = express.Router();

reviewRouter.route("/reviews").get(getAll).post(verifyJWT, create);

reviewRouter
  .route("/reviews/:id")
  .get(verifyJWT, getOne)
  .delete(verifyJWT, remove)
  .put(verifyJWT, update);

module.exports = reviewRouter;
