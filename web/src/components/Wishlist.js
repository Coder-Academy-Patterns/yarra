import React, { Fragment } from 'react'
import Product from './Product'

function Wishlist({
  products
}) { 
  return (
    <div className='mb-3'>
      <h2>Wishlist</h2>
      {
        products.map((product) => (
          <Fragment key={ product._id }>
            <Product
              {...product}
            />
          </Fragment>
        ))
      }
    </div>
  )
}

export default Wishlist