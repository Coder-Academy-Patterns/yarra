import React, { Component } from 'react';
import './App.css';
import { getDecodedToken } from './api/token'
import { signIn, signOutNow } from './api/auth'
import SignInForm from './components/SignInForm'

class App extends Component {
  state = {
    decodedToken: getDecodedToken()
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
    const { decodedToken } = this.state

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
      </div>
    );
  }
}

export default App;
