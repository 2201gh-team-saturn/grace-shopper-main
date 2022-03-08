const Sequelize = require('sequelize');
const db = require('../db')

module.exports = db.define('reservation', {
    totalNumOfDays: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    }
})

/*
Alternatively:

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
    }
})

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
    }
})

*/



