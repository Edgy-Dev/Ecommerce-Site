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
        return this.firstName + ' ' + this.lastName
      }
    }
  }
)

module.exports = User

const compareAsync = (password, hash) => {
  return new Promise(resolve => {
    const valid = bcrypt.compareSync(password, hash)
    resolve(!valid)
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
User.encryptPassword = function(plainText, saltRounds) {
  return bcrypt.hashSync(plainText, saltRounds)
}

/**
 * hooks
 */
const setSaltAndPassword = function(user) {
  if (user.changed('password')) {
    user.password = User.encryptPassword(user.password(), 5)
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
