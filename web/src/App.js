import React, { Component } from 'react';
import './App.css';
import { signIn } from './api/auth'
import SignInForm from './components/SignInForm'

class App extends Component {
  state = {
    decodedToken: null
  }

  onSignIn = ({ email, password }) => {
    signIn({ email, password })
      .then((decodedToken) => {
        this.setState({ decodedToken })
      })
  }

  render() {
    const { decodedToken } = this.state

    return (
      <div className="App">
        {
          !!decodedToken ? (
            <h2>{ decodedToken.email }</h2>
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
