import React, { Component, Fragment } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import PrimaryNav from './components/PrimaryNav'
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import Wishlist from './components/Wishlist'
import AdminProductsPage from './components/admin/Products'
import { signIn, signUp, signOutNow } from './api/auth'
import { getDecodedToken } from './api/token'
import { listProducts, createProduct, updateProduct } from './api/products'
import { listWishlist, addProductToWishlist, removeProductFromWishlist } from './api/wishlist'

class App extends Component {
  state = {
    decodedToken: getDecodedToken(), // Restore the previous signed in data
    products: { data: null },
    editedProductID: null,
    wishlist: { data: null }
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
        this.setState({ wishlist: { data: wishlist } })
      })
  }

  onRemoveProductFromWishlist = (productID) => {
    removeProductFromWishlist(productID)
      .then((wishlist) => {
        this.setState({ wishlist: { data: wishlist } })
      })
  }

  render() {
    const { decodedToken, editedProductID } = this.state
    const signedIn = !!decodedToken

    const requireAuth = (render) => (props) => {
      if (!signedIn) {
        return <p>You must be signed in.</p>
      }

      return render(props)
    }

    return (
      <Router>
        <div className="App">
          <PrimaryNav
            signedIn={ signedIn }
          />
          <Route exact path='/'
            render={ () => <Fragment>
              <h1>Yarra</h1>
              <h2 className='mb-3'>Now Delivering: Shipping trillions of new products</h2>
            </Fragment> }
          />
          <Route exact path='/signin'
            render={ () => <Fragment>
              <h2 className='mb-3'>Sign In</h2>
              <SignInForm
                onSignIn={ this.onSignIn }
              />
            </Fragment> }
          />
          <Route exact path='/register'
            render={ () => <Fragment>
              <h2 className='mb-3'>Sign Up</h2>
              <SignUpForm
                onSignUp={ this.onSignUp }
              />
            </Fragment> }
          />
          <Route exact path='/account'
            render={ requireAuth(() => <div className='mb-3'>
              <h1>Account</h1>
              <p>Email: { decodedToken.email }</p>
              <p>Signed in at: { new Date(decodedToken.iat * 1000).toISOString() }</p>
              <p>Expire at: { new Date(decodedToken.exp * 1000).toISOString() }</p>
              <button onClick={ this.onSignOut }>
                Sign Out
              </button>
            </div>) }
          />
          <Route path='/products' exact render={ requireAuth(() => (
            <ProductList
              products={ this.dataForSection('products') }
              wishlist={ this.dataForSection('wishlist') }
              editedProductID={ editedProductID }
              onEditProduct={ this.onBeginEditingProduct }
              onAddProductToWishlist={ this.onAddProductToWishlist }
              onRemoveProductFromWishlist={ this.onRemoveProductFromWishlist }
              renderEditForm={ (product) => (
                <div className='ml-3 mb-3'>
                  <ProductForm
                    initialProduct={ product }
                    submitTitle='Update Product'
                    onSubmit={ this.onUpdateEditedProduct }
                  />
                </div>
              ) }
            />
          )) } />
          <Route path='/admin/products' exact render={ () => (
            <AdminProductsPage
              onCreateProduct={ this.onCreateProduct }
            />
          ) } />
          <Route
            exact
            path='/wishlist'
            render={ requireAuth(() => (
              <Wishlist
                wishlist={ this.dataForSection('wishlist') }
                onRemoveProductFromWishlist={ this.onRemoveProductFromWishlist }
              />
          )) }
          />
        </div>
      </Router>
    );
  }

  sections = {
    products: {
      requireAuth: true,
      load: listProducts,
    },
    wishlist: {
      requireAuth: true,
      load: listWishlist,
    },
  }

  loadSection(section) {
    const { pending, requireAuth, load } = this.sections[section]
    // If already loading
    if (pending) {
      return
    }

    // If requires authentication and not signed in
    if (requireAuth && this.state.decodedToken == null) {
      return
    }

    // If already loaded
    if (this.state[section].data) {
      return
    }
    
    this.sections[section].pending = true
    
    load()
      .then((data) => {
        this.setState({
          [section]: {
            error: null,
            data,
          }
        })
      })
      .catch((error) => {
        this.setState({
          [section]: {
            error,
          }
        })
      })
  }

  dataForSection(section) {
    this.loadSection(section)
    return this.state[section].data
  }

  // When state changes
  componentDidUpdate(prevProps, prevState) {
    // If just signed in, signed up, or signed out,
    // then the token will have changed
    if (this.state.decodedToken !== prevState.decodedToken) {
      //this.load()
    }
  }
}

export default App;
