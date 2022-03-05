import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div id='entire_nav'>
    <h1>The Reverie Resort</h1>
    <nav>
      {isLoggedIn ? (
        <div className='navbar'>
          {/* The navbar will show these links after you log in */}
          <Link to='/'>Home</Link>
          <Link to='/account'>Account</Link>
          <Link to='/rooms'>Rooms</Link>
          <Link to='/experiences'>Experiences</Link>
          <a href='#' onClick={handleClick}>
            Logout
          </a>
           {/* Check out cart icon */}
          <div className='button'> CHECK OUT <i className='fa fa-shopping-cart'></i></div>
        </div>
      ) : (
        <div className='navbar'>
          {/* The navbar will show these links before you log in */}
          <Link to='/'>Home</Link>
          <Link to='/rooms'>Rooms</Link>
          <Link to='/experiences'>Experiences</Link>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Sign Up</Link>
          <div className='button'> CHECK OUT <i className='fa fa-shopping-cart'></i></div>
        </div>

      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
