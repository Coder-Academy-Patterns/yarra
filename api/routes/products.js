const express = require('express')
const Product = require('../models/Product')
const authMiddleware = require('../middleware/auth')

const router = new express.Router()

router.get('/products', authMiddleware.requireJWT, (req, res) => {
  Product.find()
    .then((products) => {
      res.json(products)
    })
    .catch((error) => {
      res.json({ error })
    })
})

module.exports = router