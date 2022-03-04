const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('room', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.FLOAT,
    defaultValue: 150.0,
    validate: {
      isDecimal: true,
    },

    imageUrl: {
        type: Sequelize.STRING(1000),
        defaultValue: 'https://media.defense.gov/2016/Jul/01/2001565082/-1/-1/0/160701-O-ZZ999-001.PNG'
    },
});
