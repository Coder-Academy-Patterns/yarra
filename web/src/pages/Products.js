import React from 'react'
import Loadable from 'react-loadable'
import Loading from './Loading'
import { listProducts } from '../api/products'
import ProductList from '../components/ProductList'

const ProductsPage = Loadable.Map({
  loader: {
    products: listProducts
  },
  loading: Loading,
  render({ products }, props) {
    return (
      <ProductList
        products={ products }
        { ...props }
      />
    )
  }
})

export default ProductsPage
