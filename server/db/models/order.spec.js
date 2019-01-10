const {expect} = require('chai')
const db = require('../index')
const Order = require('./order')

describe('Order model', () => {
  let order
  const sequelizeErrors = [
    'SequelizeValidationError',
    'SequelizeUniqueConstraintError'
  ]

  beforeEach(async () => {
    await db.sync({force: true})
  })

  beforeEach(() => {
    order = new Order({
      card: [{key: 'value'}],
      userInfo: {key: 'value'},
      total: 1
    })
  })

  it('Should only accept an array of objects for cart', () => {
    const invalidCards = [['ha'], null, undefined, 'hello', 9, [[]]]

    return Promise.all(
      invalidCards.map(async invalidItem => {
        order.card = invalidItem
        try {
          await order.validate()
          throw new Error('This should not have passed')
        } catch (error) {
          expect(sequelizeErrors).to.contain(error.name)
        }
      })
    )
  })

  it('Should only accept JSON for user info', () => {
    const invalidInformation = [{key: 'value'}, 9, 'hello', []]

    return Promise.all(
      invalidInformation.map(async invalidItem => {
        order.userInfo = invalidItem
        try {
          await order.validate()
          throw new Error('This should not have passed')
        } catch (error) {
          expect(sequelizeErrors).to.contain(error.name)
        }
      })
    )
  })

  it('Should only accept integers for total', () => {
    const invalidTotals = ['hello', {}, null, undefined, undefined]

    return Promise.all(
      invalidTotals.map(async invalidItem => {
        order.total = invalidItem
        try {
          await order.validate()
          throw new Error('This should not have passed')
        } catch (error) {
          expect(sequelizeErrors).to.contain(error.name)
        }
      })
    )
  })
})
