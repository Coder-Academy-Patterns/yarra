const passport = require('passport')
const User = require('../models/User')

passport.use(User.createStrategy())

function register(req, res, next) {
  // Create a fresh user model
  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  })
  // Create the user with the specified password
  User.register(user, req.body.password, (error, user) => {
    if (error) {
      // Our register middleware failed
      next(error)
      return
    }

    // Store user so we can access it in our handler
    req.user = user
    // Success!
    next()
  })
}

module.exports = {
  register,
  signIn: passport.authenticate('local', { session: false })
}