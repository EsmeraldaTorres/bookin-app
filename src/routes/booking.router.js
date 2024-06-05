const {
  getAll,
  create,
  getOne,
  remove,
  update,
} = require("../controllers/booking.controller");
const express = require("express");
const verifyJWT = require("../utils/verifyJWT");

const bookingRouter = express.Router();

bookingRouter.route("/booking").get(verifyJWT, getAll).post(verifyJWT, create);

bookingRouter
  .route("/booking/:id")
  .get(verifyJWT, getOne)
  .delete(verifyJWT, remove)
  .put(verifyJWT, update);

module.exports = bookingRouter;
