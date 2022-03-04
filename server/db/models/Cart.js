const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('cart', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});


//leaving this here for now incase we want to store a total for the user to checkout later or something
// total: {
//     type: Sequelize.FLOAT,
//     defaultValue: 0.00,
//     validate: {
//         isDecimal: true
//     }
// }
