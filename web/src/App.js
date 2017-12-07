import React, { Component } from 'react';
import './App.css';
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import { signIn, signUp, signOutNow } from './api/auth'
import { listProducts, createProduct, updateProduct } from './api/products'
import { getDecodedToken } from './api/token'

class App extends Component {
  state = {
    decodedToken: getDecodedToken(), // Restore the previous signed in data
    products: null,
    activeProductID: null
  }

  onSignIn = ({ email, password }) => {
    console.log('App received', { email, password })
    signIn({ email, password })
      .then((decodedToken) => {
        console.log('signed in', decodedToken)
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

  onChangeActiveProductID = (newID) => {
    this.setState({ activeProductID: newID })
  }

  onUpdateActiveProduct = (productData) => {
    const { activeProductID } = this.state
    updateProduct(activeProductID, productData)
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
            activeProductID: null,
          }
        })
      })
  }

  render() {
    const { decodedToken, products, activeProductID } = this.state
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
            activeProductID={ activeProductID }
            onChangeActiveProductID={ this.onChangeActiveProductID }
            renderEditForm={ (product) => (
              <div className='ml-3'>
                <ProductForm
                  initialProduct={ product }
                  submitTitle='Update Product'
                  onSubmit={ this.onUpdateActiveProduct }
                />
              </div>
            ) }
          />
        }
        { signedIn &&
          <div>
            <h2>Create Product</h2>
            <ProductForm
              submitTitle='Create Product'
              onSubmit={ this.onCreateProduct }
            />
          </div>
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
    }
    else {
      this.setState({
        products: null
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
