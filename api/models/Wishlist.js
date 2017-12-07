const mongoose = require('./init')
const Schema = mongoose.Schema

const wishlistSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User', unique: true },
  products: [{ type: Schema.ObjectId, ref: 'Product' }],
  dateAdded: { type: Date, default: Date.now }
})

// Allows sorting by date added
wishlistSchema.index({ dateAdded: 1 })

const Wishlist = mongoose.model('Wishlist', wishlistSchema)

module.exports = Wishlist
