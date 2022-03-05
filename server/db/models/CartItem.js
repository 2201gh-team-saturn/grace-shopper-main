const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('cartItem',
  {
    numberOfNights: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
  },
  {
    timestamps: false,
  }
);
