const express = require('express')
const Wishlist = require('../models/Wishlist')
const { requireJWT } = require('../middleware/auth')

const router = new express.Router()

// Read list
router.get('/wishlist', requireJWT, (req, res) => {
  Wishlist.findOne({ user: req.user })
    .populate('products')
    .then((wishlist) => {
      if (wishlist) {
        res.json({ products: wishlist.products })
      }
      else {
        // No wishlist created for this user yet, so just return an empty wishlist
        res.json({ products: [] })
      }
    })
    .catch((error) => {
      res.status(500).json({ error })
    })
})

// Add product to wishlist
router.post('/wishlist/products/:productID', requireJWT, (req, res) => {
  const { productID } = req.params
  Wishlist.findOneAndUpdate(
    // Find the wishlist for the signed in user
    { user: req.user },
    // Make these changes
    // $addToSet: https://docs.mongodb.com/manual/reference/operator/update/addToSet/
    { $addToSet: { products: productID } },
    // Options when updating
    // upsert: Update if wishlist exists, insert (create wishlist) if not
    // new: Give us the updated wishlist
    { upsert: true, new: true, runValidators: true }
  )
    .populate('products')
    .then((wishlist) => {
      res.json({ products: wishlist.products })
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

// Remove product from wishlist
router.delete('/wishlist/products/:productID', requireJWT, (req, res) => {
  const { productID } = req.params
  Wishlist.findOneAndUpdate(
    // Find the wishlist for the signed in user
    { user: req.user },
    // Make these changes
    // $pull: https://docs.mongodb.com/manual/reference/operator/update/pull/
    { $pull: { products: productID } },
    // Options when updating
    // upsert: Update if wishlist exists, insert (create wishlist) if not
    // new: Give us the updated wishlist
    { upsert: true, new: true, runValidators: true }
  )
    .populate('products')
    .then((wishlist) => {
      res.json({ products: wishlist.products })
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

module.exports = router