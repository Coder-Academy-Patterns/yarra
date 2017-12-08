const express = require('express')
const Wishlist = require('../models/Wishlist')
const { requireJWT } = require('../middleware/auth')

const router = new express.Router()

// Read list
router.get('/wishlist', requireJWT, (req, res) => {
  Wishlist.findOne({ user: req.user })
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

module.exports = router