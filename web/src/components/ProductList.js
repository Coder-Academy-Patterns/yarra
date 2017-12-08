import React, { Fragment } from 'react'
import Product from './Product'

function ProductList({
  products,
  editedProductID,
  onEditProduct,
  renderEditForm
}) { 
  return (
    <div className='mb-3'>
      <h2>Products</h2>
      {
        products.map((product) => (
          <Fragment key={ product._id }>
            <Product
              {...product}
              onEdit={ () => {
                onEditProduct(product._id)
              } }
            />
            { editedProductID === product._id &&
              renderEditForm(product)
            }
          </Fragment>
        ))
      }
    </div>
  )
}

export default ProductList