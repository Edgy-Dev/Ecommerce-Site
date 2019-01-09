const Sequelize = require('sequelize')
const db = require('../db')

const PaymentInfo = db.define('paymentInfo', {
  paymentToken: {
    type: Sequelize.STRING,
    allowNull: false,

    get() {
      return () => this.getDataValue('paymentToken')
    }
  },
  lastFourDigits: {
    type: Sequelize.INTEGER,
    allowNull: false,

    get() {
      return () => this.getDataValue('lastFourDigits')
    }
  }
})

module.exports = PaymentInfo
