const router = require('express').Router()
const {
  User,
  Order,
  Address,
  PaymentInfo,
  ProductInstance
} = require('../db/models')
const {ResponseMessage} = require('../utils')
const {stripe} = require('stripe')(process.env.STRIPE_SECRET)

module.exports = router

router.get('/add-address', async (req, res, next) => {
  try {
    const address = findOrCreate(req.body)
    if (req.user) {
      address.setUser(req.user)
    }
    return res.json(new ResponseMessage(address))
  } catch (err) {
    next(err)
  }
})

router.post('/add-payment', async (req, res, next) => {
  try {
    const customer = await stripe.customer.create({
      source: 'tok_visa',
      email: req.user.email
    })

    PaymentInfo.create({
      paymentToken: customer.id
    })
  } catch (err) {
    next(err)
  }
})

router.get('/orders', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {userId: req.user.id},
      attributes: {exclude: ['updatedAt', 'userId']}
    })
    res.json(new ResponseMessage(orders))
  } catch (err) {
    next(err)
  }
})

router.post('/add-to-cart', async (req, res, next) => {
  try {
    const product = await ProductInstance.findOne({
      where: {
        name: req.body.name,
        color: req.body.color,
        size: req.body.size,
        category: req.body.category
      },
      raw: true
    })

    const cartItem = {product, quantity: req.body.quantity}
    if (req.user) {
      await req.user.update({cart: [cartItem, ...req.user.cart]})
      console.log(req.user.cart)
    }

    return res.json(new ResponseMessage(cartItem))
  } catch (err) {
    next(err)
  }
})
