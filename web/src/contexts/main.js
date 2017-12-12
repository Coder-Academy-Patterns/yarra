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

export const onSignIn = ({ email, password }) => (
  signIn({ email, password })
    .then((decodedToken) => ({ decodedToken }))
)

export const onSignUp = ({ email, password, firstName, lastName }) => (
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

// onBeginEditingProduct = (newID) => {
//   this.setState({ editedProductID: newID })
// }

// onUpdateEditedProduct = (productData) => {
//   const { editedProductID } = this.state
//   updateProduct(editedProductID, productData)
//     .then((updatedProduct) => {
//       this.setState((prevState) => {
//         // Replace in existing products array
//         const updatedProducts = prevState.products.map((product) => {
//           if (product._id === updatedProduct._id) {
//             return updatedProduct
//           }
//           else {
//             return product
//           }
//         })
//         return {
//           products: updatedProducts,
//           editedProductID: null,
//         }
//       })
//     })
//     .catch((error) => {
//       this.setState({ error })
//     })
// }

// onAddProductToWishlist = (productID) => {
//   addProductToWishlist(productID)
//     .then((wishlist) => {
//       this.setState({ wishlist })
//     })
//     .catch((error) => {
//       this.setState({ error })
//     })
// }

// onRemoveProductFromWishlist = (productID) => {
//   removeProductFromWishlist(productID)
//     .then((wishlist) => {
//       this.setState({ wishlist })
//     })
//     .catch((error) => {
//       this.setState({ error })
//     })
// }