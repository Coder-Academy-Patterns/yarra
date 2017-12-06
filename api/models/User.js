const mongoose = require('./init')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
})

// Enhance using the devise-like library to add email/password to our model
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameLowerCase: true, // Ensure that all emails are lowercase
  session: false, // Disable sessions as we’ll use JWTs
})

const User = mongoose.model('User', userSchema)

module.exports = User
