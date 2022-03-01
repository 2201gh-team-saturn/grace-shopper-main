const Sequelize = require('sequelize');
const db = require('../db')

module.exports = db.define('review', {
   review_text: {
        type: Sequelize.TEXT,
        allowNull: true
   }
})
