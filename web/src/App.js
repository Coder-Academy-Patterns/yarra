import React, { Component } from 'react';
import './App.css';
import { getDecodedToken } from './api/token'
import { signIn, signOutNow } from './api/auth'
import { listProducts } from './api/products'
import SignInForm from './components/SignInForm'

class App extends Component {
  state = {
    decodedToken: getDecodedToken(),
    products: null
  }

  onSignIn = ({ email, password }) => {
    signIn({ email, password })
      .then((decodedToken) => {
        this.setState({ decodedToken })
      })
  }

  onSignOut = () => {
    signOutNow()
    this.setState({ decodedToken: null })
  }

  render() {
    const { decodedToken, products } = this.state

    return (
      <div className="App">
        {
          !!decodedToken ? (
            <div>
              <h2 className='mb-3'>{ decodedToken.email }</h2>
              <button onClick={ this.onSignOut }>Sign Out</button>
            </div>
          ) : (
            <div>
              <h2>Sign In</h2>
              <SignInForm
                onSignIn={ this.onSignIn }
              />
            </div>
          )
        }
        { products &&
          <p>{ products.length } products</p>
        }
      </div>
    );
  }

  load() {
    listProducts()
      .then((products) => {
        this.setState({ products })
      })
  }

  componentDidMount() {
    const { decodedToken } = this.state
    if (decodedToken) {
      this.load()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { decodedToken } = this.state
    // Just signed in
    if (!!decodedToken && decodedToken !== prevState.decodedToken) {
      this.load()
    }
  }
}

export default App;
