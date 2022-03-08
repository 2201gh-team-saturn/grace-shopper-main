const Sequelize = require('sequelize');
const db = require('../db')

module.exports = db.define('review', {
   // JOE CR: I think this column should just be `text`, or at least be camelCase to match conventions.
   review_text: {
        type: Sequelize.TEXT,
        allowNull: true
   }
})
