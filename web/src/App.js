import React, { Component } from 'react';
import './App.css';
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import Wishlist from './components/Wishlist'
import { signIn, signUp, signOutNow } from './api/auth'
import { getDecodedToken } from './api/token'
import { listProducts, createProduct, updateProduct } from './api/products'
import { listWishlist, addProductToWishlist, removeProductFromWishlist } from './api/wishlist'

class App extends Component {
  state = {
    decodedToken: getDecodedToken(), // Restore the previous signed in data
    products: null,
    editedProductID: null,
    wishlist: null
  }

  onSignIn = ({ email, password }) => {
    signIn({ email, password })
      .then((decodedToken) => {
        this.setState({ decodedToken })
      })
  }

  onSignUp = ({ email, password, firstName, lastName }) => {
    signUp({ email, password, firstName, lastName })
      .then((decodedToken) => {
        this.setState({ decodedToken })
      })
  }

  onSignOut = () => {
    signOutNow()
    this.setState({ decodedToken: null })
  }

  onCreateProduct = (productData) => {
    createProduct(productData)
      .then((newProduct) => {
        this.setState((prevState) => {
          // Append to existing products array
          const updatedProducts = prevState.products.concat(newProduct)
          return {
            products: updatedProducts
          }
        })
      })
  }

  onBeginEditingProduct = (newID) => {
    this.setState({ editedProductID: newID })
  }

  onUpdateEditedProduct = (productData) => {
    const { editedProductID } = this.state
    updateProduct(editedProductID, productData)
      .then((updatedProduct) => {
        this.setState((prevState) => {
          // Replace in existing products array
          const updatedProducts = prevState.products.map((product) => {
            if (product._id === updatedProduct._id) {
              return updatedProduct
            }
            else {
              return product
            }
          })
          return {
            products: updatedProducts,
            editedProductID: null,
          }
        })
      })
  }

  onAddProductToWishlist = (productID) => {
    addProductToWishlist(productID)
      .then((wishlist) => {
        this.setState({ wishlist })
      })
  }

  onRemoveProductFromWishlist = (productID) => {
    removeProductFromWishlist(productID)
      .then((wishlist) => {
        this.setState({ wishlist })
      })
  }

  render() {
    const { decodedToken, products, editedProductID, wishlist } = this.state
    const signedIn = !!decodedToken

    return (
      <div className="App">
        <h1>Yarra</h1>
        <h2 className='mb-3'>Now Delivering: Shipping trillions of new products</h2>
        {
          signedIn ? (
            <div className='mb-3'>
              <p>Email: { decodedToken.email }</p>
              <p>Signed in at: { new Date(decodedToken.iat * 1000).toISOString() }</p>
              <p>Expire at: { new Date(decodedToken.exp * 1000).toISOString() }</p>
              <button onClick={ this.onSignOut }>
                Sign Out
              </button>
            </div>
          ) : (
            <div>
              <h2>Sign In</h2>
              <SignInForm
                onSignIn={ this.onSignIn }
              />

              <h2>Sign Up</h2>
              <SignUpForm
                onSignUp={ this.onSignUp }
              />
            </div>
          )
        }
        { products &&
          <ProductList
            products={ products }
            editedProductID={ editedProductID }
            onEditProduct={ this.onBeginEditingProduct }
            onAddProductToWishlist={ this.onAddProductToWishlist }
            onRemoveProductFromWishlist={ this.onRemoveProductFromWishlist }
            renderEditForm={ (product) => (
              <div className='ml-3'>
                <ProductForm
                  initialProduct={ product }
                  submitTitle='Update Product'
                  onSubmit={ this.onUpdateEditedProduct }
                />
              </div>
            ) }
          />
        }
        { signedIn &&
          <div className='mb-3'>
            <h2>Create Product</h2>
            <ProductForm
              submitTitle='Create Product'
              onSubmit={ this.onCreateProduct }
            />
          </div>
        }
        { signedIn && wishlist &&
          <Wishlist
            products={ wishlist.products }
            onRemoveProductFromWishlist={ this.onRemoveProductFromWishlist }
          />
        }
      </div>
    );
  }

  load() {
    const { decodedToken } = this.state
    if (decodedToken) {
      listProducts()
        .then((products) => {
          this.setState({ products })
        })
        .catch((error) => {
          console.error('error loading products', error)
        })
      
      listWishlist()
        .then((wishlist) => {
          this.setState({ wishlist })
        })
        .catch((error) => {
          console.error('error loading wishlist', error)
        })
    }
    else {
      this.setState({
        products: null,
        wishlist: null
      })
    }
  }

  // When this App first appears on screen
  componentDidMount() {
    this.load()
  }

  // When state changes
  componentDidUpdate(prevProps, prevState) {
    // If just signed in, signed up, or signed out,
    // then the token will have changed
    if (this.state.decodedToken !== prevState.decodedToken) {
      this.load()
    }
  }
}

export default App;
