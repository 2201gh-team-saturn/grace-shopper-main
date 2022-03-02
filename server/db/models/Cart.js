const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('cart', {
    total: {
        type: Sequelize.FLOAT,
        defaultValue: 0.00,
        validate: {
            isDecimal: true
        }
    }
})