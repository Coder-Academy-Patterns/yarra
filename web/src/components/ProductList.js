import React, { Fragment } from 'react'
import Product from './Product'

function ProductList({
  products,
  activeProductID,
  onChangeActiveProductID,
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
                onChangeActiveProductID(product._id)
              } }
            />
            { activeProductID === product._id &&
              renderEditForm(product)
            }
          </Fragment>
        ))
      }
    </div>
  )
}

export default ProductList