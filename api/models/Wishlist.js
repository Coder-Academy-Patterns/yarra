const mongoose = require('./init')
const Schema = mongoose.Schema

const wishlistSchema = new Schema({
  // Belongs to user
  user: { type: Schema.ObjectId, ref: 'User', unique: true },
  // Has many products
  product: [{ type: Schema.ObjectId, ref: 'Product' }]
})

const Wishlist = mongoose.model('Wishlist', wishlistSchema)

module.exports = Wishlist
