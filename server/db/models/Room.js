const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('room', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    price: {
        type: Sequelize.FLOAT,
        defaultValue: 150.00,
        validate: {
            isDecimal: true
        }
    },
    imageUrl: {
        type: Sequelize.STRING(1000),
        defaultValue: ''
    },
    available: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    category: {
        type: Sequelize.STRING,
    }
})