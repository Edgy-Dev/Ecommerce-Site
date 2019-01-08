const PaymentInfo = db.define('paymentInfo', {
  paymentToken: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastFourDigits: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})


module.exports = PaymentInfo
