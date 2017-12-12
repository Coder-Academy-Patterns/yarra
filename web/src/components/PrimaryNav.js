import React, { Fragment } from "react";

function Link({ to, children }) {
  return <a href={ to } children={ children } />
}

function PrimaryNav({ signedIn }) {
  return (
    <nav className="primary">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        {signedIn ? (
          <Fragment>
            <li>
              <Link to="/wishlist">Wishlist</Link>
            </li>
            <li>
              <Link to="/account">Account</Link>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
}

export default PrimaryNav;
