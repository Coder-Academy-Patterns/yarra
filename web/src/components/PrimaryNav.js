import React, { Fragment } from 'react'
import Link from '../routing/Link'

function PrimaryNav({ signedIn }) {
  return (
    <nav className="primary">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/products">Products</Link>
        </li>
        {signedIn ? (
          <Fragment>
            <li>
              <Link href="/wishlist">Wishlist</Link>
            </li>
            <li>
              <Link href="/account">Account</Link>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            <li>
              <Link href="/signin">Sign In</Link>
            </li>
            <li>
              <Link href="/signup">Sign Up</Link>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
}

export default PrimaryNav;
