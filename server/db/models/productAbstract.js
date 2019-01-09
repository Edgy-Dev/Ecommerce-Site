const Sequelize = require('sequelize')
const db = require('../db')

const ProductAbstract = db.define('productAbstract', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {args: 1, msg: 'name must be provided'}
    }
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {args: 1, msg: 'provide a category'}
    }
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: {args: 1, msg: 'gonna get poor like this'}
    }
  },
  color: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: ['white', 'black', 'gray', 'red', 'blue', 'green']
  },
  size: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: ['Small', 'Medium', 'Large', 'XLarge']
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue:
      'Dozens of nerd hours were wasted bringing you this product...Enjoy!'
  }
})

module.exports = ProductAbstract
