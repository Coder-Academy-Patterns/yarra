import React from 'react'
import { Link } from 'react-router-dom'

function PrimaryNav({
}) {
  return (
    <nav className='primary mt-3 mb-3'>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/products'>Products</Link></li>
        <li><Link to='/wishlist'>Wishlist</Link></li>
        <li><Link to='/signin'>Sign In</Link></li>
        <li><Link to='/register'>Sign Up</Link></li>
        <li><Link to='/account'>Account</Link></li>
      </ul>
    </nav>
  )
}

export default PrimaryNav