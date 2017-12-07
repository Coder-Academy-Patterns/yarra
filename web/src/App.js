import React, { Component } from 'react';
import './App.css';
import SignInForm from './components/SignInForm'
import { signIn } from './api/auth'

class App extends Component {
  onSignIn = ({ email, password }) => {
    console.log('App received', { email, password })
    signIn({ email, password })
      .then((data) => {
        console.log('signed in', data)
      })
  }

  render() {
    return (
      <div className="App">
        <h1>Yarra</h1>
        <h2 className='mb-3'>Now Delivering: Shipping trillions of new products</h2>
        <SignInForm
          onSignIn={ this.onSignIn }
        />
      </div>
    );
  }
}

export default App;
