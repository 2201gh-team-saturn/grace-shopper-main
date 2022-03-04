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
    const { username } = this.props;
    const userType = this.props.user.type;
    console.log(userType);
    return (
      <div>
        <h3>Welcome back {username}! </h3>
        {userType === 'employee' ? (
          <div>
            <Link to={'/employee-dashboard'}>Employee Terminal </Link>
            <br />
            <span>See Bookings </span>
          </div>
        ) : (
          'Guest placeholder'
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
    username: state.auth.username,
    user: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapState, mapDispatchToProps)(Account);
