import api from './init'

export function listWishlist() {
  return api.get('/wishlist')
    .then((res) => res.data)
}

export function addProductToWishlist(productID) {
  return api.post(`/wishlist/products/${productID}`)
    .then((res) => res.data)
}

export function removeProductFromWishlist(productID) {
  return api.delete(`/wishlist/products/${productID}`)
    .then((res) => res.data)
}
