import React, { Fragment } from 'react'
import Product from './Product'

function Wishlist({
  products,
  onRemoveProductFromWishlist
}) { 
  return (
    <div className='mb-3'>
      <h2>Wishlist</h2>
      {
        products.map((product) => (
          <Fragment key={ product._id }>
            <Product
              {...product}
              onRemoveFromWishlist={ () => {
                onRemoveProductFromWishlist(product._id)
              } }
            />
          </Fragment>
        ))
      }
    </div>
  )
}

export default Wishlist