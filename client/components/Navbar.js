import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import 'boxicons';


const Navbar = ({ handleClick, isLoggedIn }) => (
  <div id='entire_nav'>
    <h1 id='site-title'>The Reverie Resort</h1>
    <nav>
      {isLoggedIn ? (
        <div className='navbar'>
          {/* The navbar will show these links after you log in */}
          <Link to='/'>HOME</Link>
          <Link to='/rooms'>ROOMS</Link>
          <Link to='/experiences'>EXPERIENCES</Link>
          <Link to='/account'>ACCOUNT</Link>
       
           {/* Check out cart icon */}
        
          <a href='#' onClick={handleClick}>
            LOGOUT
          </a>
          <Link to={'/cart'}><box-icon name='cart-alt' ></box-icon></Link>
        </div>
      ) : (
        <div className='navbar'>
          {/* The navbar will show these links before you log in */}
          <Link to='/'>HOME</Link>
          <Link to='/rooms'>ROOMS</Link>
          <Link to='/experiences'>EXPERIENCES</Link>
          <Link to='/login'>LOGIN</Link>
          <Link to='/signup'>SIGN UP</Link>
          <Link to={'/cart'}><box-icon name='cart-alt' ></box-icon></Link>
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
