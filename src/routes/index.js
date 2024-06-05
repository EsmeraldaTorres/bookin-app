const express = require("express");
const bookingRouter = require("./booking.router");
const cityRouter = require("./city.router");
const hotelRouter = require("./hotel.router");
const imageRouter = require("./image.router");
const router = express.Router();
const userRouter = require("./user.router");
const reviewRouter = require("./review.router");

// colocar las rutas aquí
router.use(userRouter);
router.use(cityRouter);
router.use(hotelRouter);
router.use(imageRouter);
router.use(bookingRouter);
router.use(reviewRouter);

module.exports = router;
