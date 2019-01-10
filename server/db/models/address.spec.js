const db = require('../db')
const Address = require('./address')
const {expect} = require('chai')

// Address tests
describe('Address model', () => {
  const addressData = {
    streetAddress: '112 4th St',
    city: 'San Luis Obispo',
    state: 'AF',
    zipCode: '93242'
  }
  let address

  const validationError = 'SequelizeValidationError'

  beforeEach(() => {
    return db.sync({force: true})
  })

  beforeEach(async function() {
    address = await Address.create(addressData)
  })

  it('should reject invalid street address', function() {
    const invalidStreetAddresses = ['no house number', 123123, null, undefined]
    // OB/JD: can use `for..of` and `await`
    return Promise.all(
      invalidStreetAddresses.map(async function(streetAddress) {
        address.streetAddress = streetAddress
        try {
          await address.validate()
          throw new Error(
            `should not address with save invalid street address ${streetAddress}`
          )
        } catch (err) {
          // OB/JD: unnecessary log
          console.error(err)
          expect(err.name).to.be.equal(validationError)
        }
      })
    )
  })

  it('should uppercase address', () => {
    expect(address.streetAddress).to.be.equal(
      addressData.streetAddress.toUpperCase()
    )
    expect(address.city).to.be.equal(addressData.city.toUpperCase())
    expect(address.state).to.be.equal(addressData.state.toUpperCase())
  })

  it('should reject invalid zip codes', () => {
    const invalidZipCodes = ['2322', '234234', ',23424-564', '34-234']

    return Promise.all(
      invalidZipCodes.map(async function(zipCode) {
        address.zipCode = zipCode
        try {
          await address.validate()
          throw new Error(
            `should not save address with invalid address ${address}`
          )
        } catch (err) {
          expect(err.name).to.be.equal(validationError)
        }
      })
    )
  })
})
