import React, { Fragment } from 'react'
import Product from './Product'

function ProductList({
  products,
  wishlist,
  editedProductID,
  onEditProduct,
  onAddProductToWishlist,
  onRemoveProductFromWishlist,
  renderEditForm
}) {
  const productIDInWishlist = (productID) => {
    if (!wishlist) {
      return false
    }

    return wishlist.products.some((product) => product._id === productID)
  }

  return (
    <div className='mb-3'>
      <h2>Products</h2>
      {
        products ? (
          products.map((product) => {
            const inWishlist = productIDInWishlist(product._id)

            return (
              <Fragment key={ product._id }>
                <Product
                  {...product}
                  onEdit={ () => {
                    onEditProduct(product._id)
                  } }
                  onAddToWishlist={ !inWishlist ? () => {
                    onAddProductToWishlist(product._id)
                  } : null }
                  onRemoveFromWishlist={ inWishlist ? () => {
                    onRemoveProductFromWishlist(product._id)
                  } : null }
                />
                { editedProductID === product._id &&
                  renderEditForm(product)
                }
              </Fragment>
            )
          })
        ) : (
          <p>Loading products…</p>
        )
      }
    </div>
  )
}

export default ProductList