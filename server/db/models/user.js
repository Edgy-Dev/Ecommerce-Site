const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define(
  'user',
  {
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
      get() {
        return () => this.getDataValue('password')
      }
    },
    salt: {
      type: Sequelize.STRING,
      get() {
        return () => this.getDataValue('salt')
      }
    },
    googleId: {
      type: Sequelize.STRING
    },
    githubId: {
      type: Sequelize.STRING
    },
    facebookId: {
      type: Sequelize.STRING
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    cart: Sequelize.ARRAY(Sequelize.JSON)
  },
  {
    getterMethods: {
      fullName() {
        return this.firstName + this.lastName
      }
    },
    setterMethods: {
      fullName(value) {
        const names = value.split(' ')
        this.setDataValue('firstName', names.slice(0, -1).join(' '))
        this.setDataValue('lastName', names.slice(-1).join(' '))
      }
    }
  }
)

module.exports = User

/**
 * instanceMethods
 */
User.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password())
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return bcrypt.genSaltSync(14)
}

User.encryptPassword = function(plainText, salt) {
  return bcrypt.hashSync(plainText, salt)
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
