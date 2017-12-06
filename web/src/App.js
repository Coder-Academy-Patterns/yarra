import React, { Component } from 'react';
import './App.css';
import SignInForm from './components/SignInForm'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Yarra</h1>
        <h2 className='mb-3'>Now Delivering: Shipping trillions of new products</h2>
        <SignInForm />
      </div>
    );
  }
}

export default App;
