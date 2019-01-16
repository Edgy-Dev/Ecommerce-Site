const router = require('express').Router()
const {Order, Address, PaymentInfo} = require('../db/models')
const {ResponseMessage} = require('../utils')
const stripe = require('stripe')(process.env.STRIPE_SECRET)

// Validate payment
const makePayment = async (source, amount) => {
  return new Promise((resolve, reject) => {
    const charge = stripe.charges.create(
      {
        source,
        amount,
        currency: 'usd',
        description: 'The edgiest clothes in the world.'
      },
      (err, charge) => {
        if (err) {
          reject(err)
        } else {
          resolve(charge)
        }
      }
    )
  })
}

const calculateTotal = cart => {
  return cart.reduce((total, item) => {
    return total + item.product.price
  }, 0)
}

router.post('/', async (req, res, next) => {
  const {selectedAddress, selectedPaymentOption, cart} = req.body

  try {
    const total = calculateTotal(req.body.cart)
    const charge = await makePayment(selectedPaymentOption.source, total)
    console.log(charge)
    const address = await Address.findOne({
      where: {
        id: selectedAddress.id
      }
    })

    const order = await Order.create({
      cart: req.body.cart,
      total: total
    })

    await address.setOrder(order)

    if (req.user) {
      await order.setUser(req.user)
      req.user.cart = []
      await req.user.save()
    }

    return res.json(new ResponseMessage('Order succesfully submitted'))
  } catch (err) {
    next(err)
  }
})

module.exports = router
