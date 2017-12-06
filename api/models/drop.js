const Product = require('./Product')

Product.deleteMany()
  .then(() => {
    console.log('Deleted products')
    process.exit()
  })
