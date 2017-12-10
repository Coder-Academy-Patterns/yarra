import React from 'react'
import { Link } from 'react-router-dom'

function PrimaryNav({
}) {
  return (
    <nav className='primary'>
      <ul>
        <li><Link to='/' exact>Home</Link></li>
        <li><Link to='/products' exact>Products</Link></li>
        <li><Link to='/wishlist' exact>Wishlist</Link></li>
        <li><Link to='/signin' exact>Sign In</Link></li>
        <li><Link to='/register' exact>Sign Up</Link></li>
      </ul>
    </nav>
  )
}

export default PrimaryNav