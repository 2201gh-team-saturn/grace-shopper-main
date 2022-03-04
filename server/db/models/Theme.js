const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('theme', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
})