import React, { Component } from 'react';
import './App.css';
import SignInForm from './components/SignInForm'

class App extends Component {
  onSignIn = ({ email, password }) => {
    console.log('sign in', email, password)
  }

  render() {
    return (
      <div className="App">
        <SignInForm
          onSignIn={ this.onSignIn }
        />
      </div>
    );
  }
}

export default App;
