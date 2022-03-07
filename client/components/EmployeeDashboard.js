import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../store/users';

class EmployeeDashboard extends Component {
  componentDidMount() {
    this.props.loadUsers();
  }
  render() {
    console.log(this.props.users);
    console.log(this.props.auth.type);
    const userType = this.props.auth.type;
    const users = this.props.users;
    console.log(this.props.auth);
    return (
      <div>
        {userType === 'employee' ? (
          <div>
            <h2>Employee Dashboard</h2>
            <h3>Employees List</h3>
            {users.map((user) => {
              if (user.type === 'employee') {
                return <li key={user.id}>{user.username}</li>;
              }
            })}
            <h3>Users List</h3>
            {users.map((user) => {
              if (user.type === 'guest') {
                return <li key={user.id}>{user.username}</li>;
              }
            })}
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.usersReducer,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDashboard);
