const express = require('express')
const Wishlist = require('../models/Wishlist')
const { requireJWT } = require('../middleware/auth')

const router = new express.Router()

// Read
router.get('/wishlist', requireJWT, (req, res) => {
  Wishlist.findOne({ user: req.user })
    .populate('products')
    .then((wishlist) => {
      if (wishlist) {
        res.json({ products: wishlist.products })
      }
      else {
        res.json({ products: [] })
      }
    })
    .catch((error) => {
      res.json({ error: { message: error.message } })
    })
})

// Add to wishlist
router.post('/wishlist/products/:productID', requireJWT, (req, res) => {
  const { productID } = req.params

  Wishlist.findOneAndUpdate({ user: req.user }, {
    $addToSet: { products: productID }
  }, { upsert: true, runValidators: true, new: true })
    .populate('products')
    .then((wishlist) => {
      res.status(201).json({ products: wishlist.products })
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

// Remove from wishlist
router.delete('/wishlist/products/:productID', requireJWT, (req, res) => {
  const { productID } = req.params

  Wishlist.findOneAndUpdate({ user: req.user }, {
    $pull: { products: productID }
  }, { upsert: true, runValidators: true, new: true })
    .populate('products')
    .then((wishlist) => {
      res.status(201).json({ products: wishlist.products })
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

module.exports = router