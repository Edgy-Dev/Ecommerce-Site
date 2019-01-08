const Sequelize = require('sequelize')
const db = require('../db')

const ProductAbstract = db.define('productAbstract', {
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
  Colors: {
    type: Sequelize.ARRAY,
    defaultValue: [white, black, gray, red, blue, green]
  },
  Sizes: {
    type: Sequelize.ARRAY,
    defaultValue: [Small, Medium, Large, XLarge]
  },
  Description: {
    type: Sequelize.TEXT,
    defaultValue:
      'Dozens of nerd hours were wasted bringing you this product...Enjoy!'
  }
})

module.exports = ProductAbstract
