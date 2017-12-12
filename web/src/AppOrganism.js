import React, { Component, Fragment } from 'react';
import './App.css';
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import Wishlist from './components/Wishlist'
import PrimaryNav from './components/PrimaryNav'
import Error from './components/Error'
import makeAware from 'react-organism'
import * as mainContext from './contexts/main'
import Router from './routing/Router'
import pathToState from './routing/pathToState'

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

function Main({
  route,
  error, decodedToken, products, editedProductID, wishlist,
  handlers: {
    onSignIn,
    onSignUp,
    onSignOut,
    onBeginEditingProduct,
    onAddProductToWishlist,
    onRemoveProductFromWishlist,
    onUpdateEditedProduct
  }
}) {
  const signedIn = !!decodedToken

  return (
    <div className="App">

      <PrimaryNav signedIn={ signedIn } />

      { error &&
        <Error error={ error } />
      }

      { route.home &&
        <Fragment>
          <h1>Yarra</h1>
          <h2 className='mb-3'>Now Delivering: Shipping trillions of new products</h2>
        </Fragment>
      }

      <Route path='/signin' exact render={ ({ match }) => (
        <Fragment>
          <h2>Sign In</h2>
          <SignInForm
            onSignIn={ onSignIn }
          />
        </Fragment>
      ) } />

      <Route path='/signup' exact render={ () => (
        <Fragment>
          <h2>Sign Up</h2>
          <SignUpForm
            onSignUp={ onSignUp }
          />
        </Fragment>
      ) } />

      { route.account &&
        <Fragment>
          <div className='mb-3'>
            <p>Email: { decodedToken.email }</p>
            <p>Signed in at: { new Date(decodedToken.iat * 1000).toISOString() }</p>
            <p>Expire at: { new Date(decodedToken.exp * 1000).toISOString() }</p>
            <button onClick={ onSignOut }>
              Sign Out
            </button>
          </div>
        </Fragment>
      }
      
      { route.products &&
        <Fragment>
          { products &&
            <ProductList
              products={ products }
              editedProductID={ editedProductID }
              onEditProduct={ onBeginEditingProduct }
              onAddProductToWishlist={ onAddProductToWishlist }
              onRemoveProductFromWishlist={ onRemoveProductFromWishlist }
              renderEditForm={ (product) => (
                <div className='ml-3'>
                  <ProductForm
                    initialProduct={ product }
                    submitTitle='Update Product'
                    onSubmit={ onUpdateEditedProduct }
                  />
                </div>
              ) }
            />
          }
        </Fragment>
      }

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
        
      { route.wishlist &&
        <Fragment>
          { wishlist &&
            <Wishlist
              products={ wishlist.products }
              onRemoveProductFromWishlist={ onRemoveProductFromWishlist }
            />
          }
        </Fragment>
      }

      { route.notFound &&
        <h1>Page not found: { route.notFound.path }</h1>
      }

    </div>
  );
}

const MainAware = makeAware(Main, mainContext)

export default function App() {
  return (
    <Router
      pathToState={ pathToState }
      render={ (route) =>
        <MainAware route={ route } />
      }
    />
  )
}
