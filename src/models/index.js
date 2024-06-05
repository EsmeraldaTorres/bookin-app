const Hotel = require("./Hotel");
const City = require("./City");
const Image = require("./Image");
const Booking = require("./Booking");
const Review = require("./Review");
const User = require("./User");

City.hasMany(Hotel);
Hotel.belongsTo(City);

Hotel.hasMany(Image);
Image.belongsTo(Hotel);

Booking.belongsTo(Hotel);
Hotel.hasMany(Booking);

Booking.belongsTo(User);
User.hasMany(Booking);

Review.belongsTo(Hotel);
Hotel.hasMany(Review);

Review.belongsTo(User);
User.hasMany(Review);
