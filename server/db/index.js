//this is the access point for all things database related!

const db = require('./db');
const Room = require('./models/Room');
const User = require('./models/User');
const Experience = require('./models/Experience');
const Review = require('./models/Review');
const Reservation = require('./models/Reservation');
const Theme = require('./models/Theme')

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
    Reservation,
    Theme
  },
};
