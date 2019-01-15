const router = require('express').Router()
const {User, Order} = require('../db/models')
const {ResponseMessage} = require('../utils')

module.exports = router

// router.get('/', async (req, res, next) => {
//   try {
//     const users = await User.findAll({
//       // explicitly select only the id and email fields - even though
//       // users' passwords are encrypted, it won't help if we just
//       // send everything to anyone who asks!
//       attributes: ['id', 'email']
//     })
//     res.json(new ResponseMessage(users))
//   } catch (err) {
//     next(err)
//   }
// })

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
