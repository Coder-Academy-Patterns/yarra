import React, { Fragment } from 'react'
import Product from './Product'

function ProductList({
  products,
  productsInWishlist,
  editedProductID,
  onEditProduct,
  onAddProductToWishlist,
  onRemoveProductFromWishlist,
  renderEditForm
}) {
  const isProductInWishlist = (id) => productsInWishlist.some(product => product._id === id)

  return (
    <div className='mb-3'>
      <h2>Products</h2>
      {
        products.map((product) => {
          const inWishlist = !!productsInWishlist && isProductInWishlist(product._id)
          return (
            <Fragment key={ product._id }>
              <Product
                {...product}
                onEdit={ () => {
                  onEditProduct(product._id)
                } }
                onAddToWishlist={ !!productsInWishlist && !inWishlist && (() => {
                  onAddProductToWishlist(product._id)
                }) }
                onRemoveFromWishlist={ !!productsInWishlist && inWishlist && (() => {
                  onRemoveProductFromWishlist(product._id)
                }) }
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