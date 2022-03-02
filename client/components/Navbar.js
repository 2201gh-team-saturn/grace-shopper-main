import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1>FS-App-Template</h1>
    <nav>
      {isLoggedIn ? (
        <div className='navbar'>
          {/* The navbar will show these links after you log in */}
          <Link to="/homepage">Home</Link>
          <Link to="/home">Home</Link>
          <Link to="/rooms">Rooms</Link>
          <Link to="/experiences">Experiences</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className='navbar'>
          {/* The navbar will show these links before you log in */}
         
          <Link to="/homepage">Home</Link>
          <Link to="/rooms">Rooms</Link>
          <Link to="/experiences">Experiences</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
