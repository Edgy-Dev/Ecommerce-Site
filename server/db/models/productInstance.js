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
  Description: {
    type: Sequelize.TEXT,
    defaultValue:
      'Dozens of nerd hours were wasted bringing you this product...Enjoy!'
  }
})

module.exports = ProductInstance
