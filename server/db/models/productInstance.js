const Sequelize = require('sequelize')
const db = require('../db')

const ProductInstance = db.define(
  'productInstance',
  {
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
        len: {args: 1, msg: 'product must have a category'}
      }
    },
    thumbImage: {
      type: Sequelize.STRING,
      defaultValue:
        'http://dickensgifts.com/thumbnail.asp?file=assets/images/27483.jpg&maxx=300&maxy=0'
    },
    price: {
      type: Sequelize.INTEGER,
      validate: {
        min: {args: 1, msg: 'price of at least one dollar is required'}
      }
    },
    color: {
      type: Sequelize.STRING,
      allowNull: false
    },
    size: {
      type: Sequelize.STRING,
      allowNull: false
    },
    quantity: {
      type: Sequelize.INTEGER,
      validate: {
        min: 0
      },
      defaultValue: 10
    }
  },
  {
    hooks: {
      beforeBulkCreate: function(product) {
        if (product.category == 'Tee') {
          product.price = 1500
        } else if (product.category == 'Longsleeve') {
          product.price = 2000
        } else if (product.category == 'Hoodie') {
          product.price = 3000
        }
      },
      beforeValidate: function(product) {
        if (product.category == 'Tee') {
          product.price = 1500
        } else if (product.category == 'Longsleeve') {
          product.price = 2000
        } else if (product.category == 'Hoodie') {
          product.price = 3000
        }
      }
    }
  }
)

module.exports = ProductInstance
