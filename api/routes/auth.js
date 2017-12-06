const express = require('express')
const authMiddleware = require('../middleware/auth')

const router = new express.Router()

// Register
router.post('/auth/register',
  /* middleware that handles the registration process */
  authMiddleware.register,
  /* json handler */
  authMiddleware.signJWTForUser
)

// Sign in
router.post('/auth',
  /* middleware that handles the sign in */
  authMiddleware.signIn,
  /* json handler */
  authMiddleware.signJWTForUser
)

module.exports = router