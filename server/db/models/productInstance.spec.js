/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const productInstance = db.model('productInstance')

describe('productInstance model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    let product = productInstance.build({name: ''})
    it('fails if name is null', async () => {
      // OB/JD: consider using chai-as-promised
      try {
        await product.validate()
        throw Error('validation was successful but should have failed')
      } catch (err) {
        expect(err.message).to.contain('name must be provided')
      }
    })
    it('fails if name is an empty string', async () => {
      product = productInstance.build()
      try {
        await product.validate()
        throw Error('validation was successful but should have failed')
      } catch (err) {
        expect(err.message).to.contain('name cannot be null')
      }
    })
  })
})
