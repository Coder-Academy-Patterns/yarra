const express = require('express')
const authMiddleware = require('../middleware/auth')

const router = new express.Router()

// Register
router.post('/auth/register',
  /* middleware that handles the registration process */
  authMiddleware.register,
  /* json handler */
  (req, res) => {
    res.json({
      user: req.user
    })
  }
)

module.exports = router