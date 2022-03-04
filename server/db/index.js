//this is the access point for all things database related!

const db = require('./db');
const Room = require('./models/Room');
const User = require('./models/User');
const Experience = require('./models/Experience');
const Review = require('./models/Review');
const Reservation = require('./models/Reservation');

//associations could go here!
// Many to many association between rooms and reservations
// Room.belongsToMany(Reservation, {through: 'booked_room', constraints: false, allowNull:true, defaultValue:null});
// Reservation.belongsToMany(Room, {through: 'booked_room', constraints: false, allowNull:true, defaultValue:null});
// Room.belongsToMany(Reservation, {through: 'booked_room'});
// Reservation.belongsToMany(Room, {through: 'booked_room'});
Room.hasMany(Reservation);
Reservation.belongsTo(Room);

// One to many association between users and reservations
User.hasMany(Reservation);
Reservation.belongsTo(User);

Room.hasMany(Experience);
Experience.belongsTo(Room);

User.hasMany(Review);
Review.belongsTo(User)

module.exports = {
  db,
  models: {
    User,
    Experience,
    Review,
    Room,
    Reservation
  },
};
