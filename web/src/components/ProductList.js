import React from 'react'
import Product from './Product'

function ProductList({
  products
}) { 
  return (
    <div className='mb-3'>
      <h2>Products</h2>
      {
        products.map((product) => (
          <Product {...product} />
        ))
      }
    </div>
  )
}

export default ProductList