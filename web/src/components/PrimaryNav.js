import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

function PrimaryNav({
  signedIn
}) {
  return (
    <nav className='primary mt-3 mb-3'>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/products'>Products</Link></li>
        <li><Link to='/wishlist'>Wishlist</Link></li>
        {
          signedIn ? <Fragment>
            <li><Link to='/account'>Account</Link></li>
          </Fragment> : <Fragment>
            <li><Link to='/signin'>Sign In</Link></li>
            <li><Link to='/register'>Sign Up</Link></li>
          </Fragment>
        }
      </ul>
    </nav>
  )
}

export default PrimaryNav