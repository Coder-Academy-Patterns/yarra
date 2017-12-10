import React, { Fragment } from 'react'
import Product from './Product'

function Wishlist({
  wishlist,
  onRemoveProductFromWishlist
}) { 
  return (
    <div className='mb-3'>
      <h2>Wishlist</h2>
      {
        !!wishlist ? (
          wishlist.products.map((product) => (
            <Fragment key={ product._id }>
              <Product
                {...product}
                onRemoveFromWishlist={ () => {
                  onRemoveProductFromWishlist(product._id)
                } }
              />
            </Fragment>
          ))
        ) : (
          <p>Loading wishlist…</p>
        )
      }
    </div>
  )
}

export default Wishlist