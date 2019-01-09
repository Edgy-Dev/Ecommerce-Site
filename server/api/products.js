const router = require('express').Router()
const {ProductInstance} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await ProductInstance.findAll({})
    res.json(products)
  } catch (err) {
    next(err)
  }
})
