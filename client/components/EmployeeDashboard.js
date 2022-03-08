import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchShoppingCart, deleteRoomThunk } from '../store/shopping_cart';
import { fetchUsers } from '../store/users';
import { fetchReservations } from '../store/reservations'

class EmployeeDashboard extends Component {

  componentDidMount() {
    this.props.loadUsers();
    this.props.loadReservations();
  }
  render() {
    console.log(this.props.users);
    console.log(this.props.auth.type);
    const userType = this.props.auth.type;
    const users = this.props.users;
    const reservations = this.props.reservations;

    return (
      <div className='employee_dashboard'>
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
            <h3>Reservations List</h3>

            {reservations.map((reservation) => {
              return (
                <table key={reservation.id}>
                  <tbody>
                    <th>Name</th>
                    <th>Room</th>
                    <th>Number of Nights</th>
                    <tr>
                      <td>{reservation.user.firstName}</td>
                      <td>{reservation.room.name}</td>
                      <td>{reservation.totalNumofDays}</td>
                    </tr>
                  </tbody>
                </table>
              )
            })}

          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    users: state.usersReducer,
    auth: state.auth,
    reservations: state.reservationsReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // loadRooms: () => dispatch(fetchRooms()),
    //loadCart: (id) => dispatch(fetchShoppingCart(id)),
    loadUsers: () => dispatch(fetchUsers()),
    loadReservations: () => dispatch(fetchReservations())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDashboard);
