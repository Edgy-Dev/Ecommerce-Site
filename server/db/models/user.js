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
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
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

const compareAsync = (password, userPassword) => {
  return new Promise(resolve => {
    const valid = bcrypt.compareSync(password, userPassword)
    resolve(valid)
  })
}

/**
 * instanceMethods
 */
User.prototype.validPassword = function(password) {
  return compareAsync(password, this.password())
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return bcrypt.genSaltSync(5)
}

User.encryptPassword = function(plainText, salt) {
  return bcrypt.hashSync(plainText, salt)
}

/**
 * hooks
 */
const setSaltAndPassword = function(user) {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

const normalizeName = name => {
  name = name.toLowerCase()
  return name[0].toUpperCase() + name.slice(1)
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)

User.addHook('beforeSave', user => {
  user.firstName = normalizeName(user.firstName)
  user.lastName = normalizeName(user.lastName)
})
