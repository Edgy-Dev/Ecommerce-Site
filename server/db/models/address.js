const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define(
  'address',
  {
    streetAddress: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        is: [/(^|\b\s+)\d+\s+/] // Starts with number
      }
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isAbbrev(value) {
          if (value.length !== 2) {
            throw new Error('State must be abbreviated')
          }
        }
      }
    },
    zipCode: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        is: /(^\d{5}$)|(^\d{5}-\d{4}$)/, // ##### or #####-####
        notEmpty: true
      }
    }
  },
  {
    getterMethods: {
      secondLine() {
        return `${this.city}, ${this.state}, ${this.zipCode}`
      }
    },
    setterMethods: {
      secondLine(value) {
        const [city, state, zipCode] = value.split(' ')
        this.setDataValue('city', city)
        this.setDataValue('state', state)
        this.setDataValue('zipCode', zipCode)
      }
    }
  }
)

Address.addHook('beforeSave', address => {
  address.streetAddress = address.streetAddress.toUpperCase()
  address.city = address.city.toUpperCase()
  address.state = address.state.toUpperCase()
})

module.exports = Address
