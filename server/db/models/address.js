const Address = db.define('address', {
  streetAddress: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zipCode: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  getterMethods: {
    firstLine() {
      return this.streetAddress
    },

    secondLine() {
      return `${this.city}, ${this.state}, ${this.zipCode}`
    }
  },
  setterMethods: {
    firstLine(value) {
      this.setDataValue('streetAddress', value)
    },

    secondLine(value) {
      const [city, state, zipCode] = value.split(' ');
      this.setDataValue('city', city);
      this.setDataValue('state', state);
      this.setDataValue('zipCode', zipCode);
    }
  }
})


module.exports = Address
