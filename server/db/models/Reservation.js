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

})


//leaving this here incase we want to store it for later in the project or remove totally later
// totalPrice: {
//     type: Sequelize.FLOAT,
//     defaultValue: 150.00,
//     validate: {
//         isDecimal: true
//     }
// }
