//this is the access point for all things database related!

const db = require('./db');
const Room = require('./models/Room');
const User = require('./models/User');
const Experience = require('./models/Experience');
const Review = require('./models/Review');
const Reservation = require('./models/Reservation');
const Theme = require('./models/Theme')

//associations could go here!
Room.hasMany(User);
User.belongsTo(Room);

Room.hasMany(Experience);
Experience.belongsTo(Room);

Room.hasMany(Reservation);
Reservation.belongsTo(Room);

User.hasMany(Reservation);
Reservation.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User)

Reservation.hasMany(Review);
Review.belongsTo(Reservation)

Room.belongsToMany(Theme, {through: "rooms_themes" }); //creates a new table that stores FK and PK , setTheme() comes from this
Theme.belongsToMany(Room, {through: "rooms_themes" });

module.exports = {
  db,
  models: {
    User,
    Experience,
    Review,
    Room,
    Theme
  },
};
