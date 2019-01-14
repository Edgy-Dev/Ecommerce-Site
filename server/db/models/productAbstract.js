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
    defaultValue: 'Tee'
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: {args: 1, msg: 'gonna get poor like this'}
    }
  },
  color: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: ['White', 'Black', 'Gray', 'Red', 'Blue', 'Green']
  },
  size: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: ['Small', 'Medium', 'Large', 'XLarge']
  },
  thumbImage: {
    type: Sequelize.STRING,
    defaultValue:
      'http://dickensgifts.com/thumbnail.asp?file=assets/images/27483.jpg&maxx=300&maxy=0'
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue:
      'Dozens of nerd hours were wasted bringing you this product...Enjoy!'
  }
})

module.exports = ProductAbstract
