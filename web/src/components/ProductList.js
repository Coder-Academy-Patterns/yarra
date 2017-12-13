import React, { Fragment } from 'react'
import Product from './Product'

// All this function does it determine whether the 'add to wishlist' and 'remove from wishlist' buttons should be shown
function statusForWishlist(product, productsInWishlist) {
  const hasWishlist = !!productsInWishlist

  // Does not have wishlist
  if (!hasWishlist) {
    return { showAdd: false, showRemove: false }
  }
  
  // Has wishlist
  const inWishlist = productsInWishlist.some((productInWishlist) => {
    // Found a matching product
    // i.e. this `product` is in the wishlist
    return (productInWishlist._id === product._id)
  })

  return { showAdd: !inWishlist, showRemove: inWishlist }
}

function ProductList({
  products,
  productsInWishlist,
  editedProductID,
  onEditProduct,
  onAddProductToWishlist,
  onRemoveProductFromWishlist,
  renderEditForm
}) {
  const hasWishlist = !!productsInWishlist

  return (
    <div className='mb-3'>
      <h2>Products</h2>
      {
        products.map((product) => {
          const { showAdd, showRemove } = statusForWishlist(product, productsInWishlist)

          return (
            <Fragment key={ product._id }>
              <Product
                {...product}
                onEdit={ () => {
                  onEditProduct(product._id)
                } }
                onAddToWishlist={ showAdd ? () => {
                  onAddProductToWishlist(product._id)
                } : null }
                onRemoveFromWishlist={ showRemove ? () => {
                  onRemoveProductFromWishlist(product._id)
                } : null }
              />
              { editedProductID === product._id &&
                renderEditForm(product)
              }
            </Fragment>
          )
        })
      }
    </div>
  )
}

export default ProductList