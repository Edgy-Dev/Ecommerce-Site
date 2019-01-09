const router = require('express').Router()
const {ProductAbstract} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await ProductAbstract.findAll({})
    res.json(products)
  } catch (err) {
    next(err)
  }
})
