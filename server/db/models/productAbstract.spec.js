/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const productAbstract = db.model('productAbstract')

describe('productAbstract model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('a single product', () => {
    let product = productAbstract.build({
      name: 'hello',
      category: 'tee-shirt',
      price: 10
    })
    it('contains default values where values are not provided', () => {
      expect(product.size).to.have.length(4)
      expect(product.color).to.have.length(6)
    })
  })
})
