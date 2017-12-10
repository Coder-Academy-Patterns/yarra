import React from 'react'
import ProductForm from '../../components/ProductForm'

function AdminProductsPage({
  onCreateProduct
}) {
  return (
    <div className='mb-3'>
      <h2>Create Product</h2>
      <ProductForm
        submitTitle='Create Product'
        onSubmit={ onCreateProduct }
      />
    </div>
  )
}

export default AdminProductsPage
