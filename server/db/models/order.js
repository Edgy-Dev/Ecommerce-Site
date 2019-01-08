const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('Order', {
  cart: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    allowNull: false
  },
  user: {
    type: Sequelize.JSON,
    allowNull: true
  },
  userInfo: {
    type: Sequelize.JSON,
    allowNull: true
  },
  total: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});


module.exports = Order;
