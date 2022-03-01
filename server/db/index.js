//this is the access point for all things database related!

const db = require('./db')
const Room = require('./models/Room')
const User = require('./models/User')
const Experience = require('./models/Experience')
const Review = require('./models/Review')

//associations could go here!
Room.hasMany(User);
User.hasOne(Room);
Room.hasMany(Experience);
Experience.hasOne(Room);

//model not built, might add later if we have time:
//Room.hasMany(Reservation);
//Reservation.hasOne(Room);
//User.hasMany(Reservation)
//Reservation.hasOne(User);


module.exports = {
  db,
  models: {
    User,
    Experience,
    Review,
    Room
  },
}
