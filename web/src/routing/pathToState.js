function pathToState(path) {
  if (path === '/') {
    return { home: true }
  }
  else if (path === '/products') {
    return { products: true }
  }
  else if (path === '/wishlist') {
    return { wishlist: true }
  }
  else if (path === '/account') {
    return { account: true }
  }
  else if (path === '/admin/products') {
    return { admin: { products: true } }
  }
  else {
    return { notFound: { path } }
  }
}

export default pathToState
