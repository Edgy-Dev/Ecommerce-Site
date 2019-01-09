const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  cart: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    allowNull: false,
    defaultValue: []
  },
  total: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  completed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

module.exports = Order
