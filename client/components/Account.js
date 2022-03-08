import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../store/users';
import { Link } from 'react-router-dom';
/**
 * COMPONENT
 */
class Account extends Component {
  componentDidMount() {
    this.props.loadUsers();
  }
  render() {
    const { firstName } = this.props;
    const userType = this.props.user.type;
    console.log(userType);
    return (
      <div className='account_container'>
        <img className='account_img' src='/profile_pic.jpeg' />
        <h3>Welcome back {firstName}! </h3>
        {userType === 'employee' ? (
          <div>
            <span>
              <Link to={'/employee-dashboard'}>Employee Terminal </Link>
            </span>
            <br />
            <span>See Bookings </span>
          </div>
        ) : (
          ''
        )}

        {userType === 'guest' ? (
          <div>
            <span>Reservations</span>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    firstName: state.auth.firstName,
    user: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapState, mapDispatchToProps)(Account);
