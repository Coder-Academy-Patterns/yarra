const Product = require('./Product')

Product.create([
  {
    brandName: 'Estamico',
    name: 'Baby Girls’ Cotton Snow Boots'
  },
  {
    brandName: 'Misaky',
    name: 'Baby Boys’ Deer Cap'
  },
  {
    brandName: 'Eyetribe',
    name: 'FR030P Cleo - Toddler 1-3 yrs'
  }
])
  .then((products) => {
    console.log('Created products', products)
  })
  .catch((error) => {
    console.error(error)
  })