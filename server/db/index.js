//this is the access point for all things database related!

const db = require('./db');
const Room = require('./models/Room');
const User = require('./models/User');
const Experience = require('./models/Experience');
const Review = require('./models/Review');
const Reservation = require('./models/Reservation');

//associations could go here!
Room.hasMany(User);
User.belongsTo(Room);

Room.hasMany(Experience);
Experience.belongsTo(Room);

Room.hasMany(Reservation);
Reservation.belongsTo(Room);

User.hasMany(Reservation);
Reservation.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    Experience,
    Review,
    Room,
  },
};
