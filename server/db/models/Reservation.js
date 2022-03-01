const Sequelize = require('sequelize');
const db = require('../db')

module.exports = db.define('reservation', {
    startDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    endDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    totalPrice: {
        type: Sequelize.FLOAT,
        defaultValue: 150.00,
        validate: {
            isDecimal: true
        }
    }
})