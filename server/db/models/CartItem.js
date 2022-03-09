const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('cartItem',
  {
    numberOfNights: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
      validate: {
        min: 1,
        max: 30,
      },
    },
  },
  {
    timestamps: false,
  }
);
