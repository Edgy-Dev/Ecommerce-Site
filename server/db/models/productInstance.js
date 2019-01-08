const Sequelize = require('sequelize')
const db = require('../db')

const ProductInstance = db.define('productAbstract', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: 1
    }
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: 1
    }
  },
  Price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1
    }
  },
  Color: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Size: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  }
})

module.exports = ProductInstance
