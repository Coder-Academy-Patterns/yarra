const mongoose = require('./init')

const Product = mongoose.model('Product', {
  brandName: String, // e.g. Holden
  name: String // e.g. Commodore
})

module.exports = Product
