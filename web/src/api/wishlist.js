import api from './init'

export function listWishlist() {
  return api.get('/wishlist')
    .then((res) => res.data)
}
