import { signIn, signUp, signOutNow } from '../api/auth'
import { getDecodedToken } from '../api/token'
import { listProducts, createProduct, updateProduct } from '../api/products'
import { listWishlist, addProductToWishlist, removeProductFromWishlist } from '../api/wishlist'

export const initial = () => ({
  error: null,
  decodedToken: getDecodedToken(), // Restore the previous signed in data
  products: null,
  editedProductID: null,
  wishlist: null
})

export function load(current, previous, { decodedToken }) {
  const signedIn = !!decodedToken

  // const changed = (f) => !previous || f(current) !== f(previous)
  const nowPresent = (f) => !!f(current) && (!previous || !f(previous))

  const onProducts = nowPresent(p => p.route.products)
  const onWishlist = nowPresent(p => p.route.wishlist)

  return [
    (onProducts) &&
      listProducts().then(products => ({ products })),
    (signedIn && (onProducts || onWishlist)) &&
      listWishlist().then(wishlist => ({ wishlist }))
  ]
}

export const onSignIn = (props, { email, password }) => (
  signIn({ email, password })
    .then((decodedToken) => ({ decodedToken }))
)

export const onSignUp = (props, { email, password, firstName, lastName }) => (
  signUp({ email, password, firstName, lastName })
    .then((decodedToken) => ({ decodedToken }))
)

export const onSignOut = () => {
  signOutNow()
  return { decodedToken: null }
}

export const onCreateProduct = (props, productData) => {
  createProduct(productData)
    .then((newProduct) => ({ products }) => ({
        products: products.concat(newProduct)
    }))
}

export const onBeginEditingProduct = (props, newID) => ({ editedProductID }) => (
  ({ editedProductID: editedProductID !== newID ? newID : null })
)

export function *onUpdateEditedProduct (props, productData) {
  let editedProductID

  yield (currentState) => {
    editedProductID = currentState.editedProductID
  }

  yield updateProduct(editedProductID, productData)
    .then((updatedProduct) => ({ products }) => ({
      products: products.map((product) => {
        if (product._id === updatedProduct._id) {
          return updatedProduct
        }
        else {
          return product
        }
      }),
      editedProductID: null,
    })
  )
}

export const onAddProductToWishlist = (props, productID) => (
  addProductToWishlist(productID)
    .then((wishlist) => ({ wishlist }))
)

export const onRemoveProductFromWishlist = (props, productID) => (
  removeProductFromWishlist(productID)
    .then((wishlist) => ({ wishlist }))
)
