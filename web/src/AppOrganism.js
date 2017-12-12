import React, { Component, Fragment } from 'react';
import './App.css';
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import Wishlist from './components/Wishlist'
import PrimaryNav from './components/PrimaryNav'
import Error from './components/Error'
import makeOrganism from 'react-organism'
import * as mainContext from './contexts/main'

function Route({
  path,
  render
}) {
  if (path === '/') {
    return render()
  }
  else {
    return null
  }
}

const requireAuth = (a) => a

function App({
  error, decodedToken, products, editedProductID, wishlist
}) {
  const signedIn = !!decodedToken

  return (
    <div className="App">

      <PrimaryNav signedIn={ signedIn } />

      { error &&
        <Error error={ error } />
      }

      <Route path='/' exact render={ () => (
        <Fragment>
          <h1>Yarra</h1>
          <h2 className='mb-3'>Now Delivering: Shipping trillions of new products</h2>
        </Fragment>
      ) } />

      <Route path='/signin' exact render={ ({ match }) => (
        <Fragment>
          <h2>Sign In</h2>
          <SignInForm
            onSignIn={ this.onSignIn }
          />
        </Fragment>
      ) } />

      <Route path='/signup' exact render={ () => (
        <Fragment>
          <h2>Sign Up</h2>
          <SignUpForm
            onSignUp={ this.onSignUp }
          />
        </Fragment>
      ) } />

      <Route path='/account' exact render={ requireAuth(() => (
        <Fragment>
          <div className='mb-3'>
            <p>Email: { decodedToken.email }</p>
            <p>Signed in at: { new Date(decodedToken.iat * 1000).toISOString() }</p>
            <p>Expire at: { new Date(decodedToken.exp * 1000).toISOString() }</p>
            <button onClick={ this.onSignOut }>
              Sign Out
            </button>
          </div>
        </Fragment>
      )) } />
      
      <Route path='/products' exact render={ () => (
        <Fragment>
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
        </Fragment>
      ) } />

      <Route path='/admin/products' exact render={ requireAuth(() => (
        <Fragment>
          { signedIn &&
            <div className='mb-3'>
              <h2>Create Product</h2>
              <ProductForm
                submitTitle='Create Product'
                onSubmit={ this.onCreateProduct }
              />
            </div>
          }
        </Fragment>
      )) } />
        
      <Route path='/wishlist' exact render={ requireAuth(() => (
        <Fragment>
          { wishlist &&
            <Wishlist
              products={ wishlist.products }
              onRemoveProductFromWishlist={ this.onRemoveProductFromWishlist }
            />
          }
        </Fragment>
      )) } />

      <Route render={ ({ location }) => (
        <h1>Page not found: { location.pathname }</h1>
      ) } />

    </div>
  );
}

export default makeOrganism(App, mainContext);
