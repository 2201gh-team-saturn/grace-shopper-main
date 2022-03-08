import React, { Component, useContext } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchShoppingCart, clearAllCartItems } from '../store/shopping_cart';
import { fetchUsers } from '../store/users';
// import { CartContext } from '../App'
import { addReservation } from '../store/reservations';

class Cart extends Component {

  componentDidMount() {
    this.props.fetchCart(this.props.userId);
  }
  onClick(totalNumOfDays, roomId) {
    this.props.addReservation(totalNumOfDays, roomId);
    this.props.checkoutCart();
  }

  render() {
    console.log(this.props);
    // console.log(this.props.user);
    const user = this.props.user;
    const items = this.props.cartItems;
    const totalItems = this.props.cartItems[0];

    if (totalItems) {
      console.log(totalItems);
    }
    //const {room} = this.props.cart
    // console.log(room);
    return (
      <div>
        <div className='cart_container'>
          <h3> {user.username}'s Cart</h3>
          {items.map((item) => {
            return (
              <div className='cart_format' key={item.id}>
                <img className='cart_img' src={item.room.imageUrl} />

                <div className='cartItemInfo'>
                  <p>{item.room.name}</p>
                  <p> Price: ${item.room.price}</p>
                  <p> Number of nights: {item.numberOfNights} </p>
                  <button className='cart_btn'>Edit Dates</button>
                </div>
              </div>
            );
          })}
          {totalItems ? (
            <div className="cart_summary">
              <h4> Total Amount of Days: {
                items.reduce((total, item) => {
                  return total + item.numberOfNights
                }, 0)
              }
                <br />
                Total Price: ${
                  items.reduce((total, item) => {
                    return total + item.room.price
                  }, 0)
                }
              </h4>
              <button onClick={items.map((item) => this.onClick(item.totalNumOfDays, item.room.id))}>Check Out</button>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    userId: state.auth.id,
    cartItems: state.shopping_cart,
    user: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    // loadRooms: () => dispatch(fetchRooms()),
    //loadCart: (id) => dispatch(fetchShoppingCart(id)),
    fetchCart: () => dispatch(fetchShoppingCart()),
    createReservations: (totalNumOfDays, roomId) => dispatch(addReservation(totalNumOfDays, roomId)),
    checkoutCart: () => dispatch(clearAllCartItems())
  };
};

export default connect(mapState, mapDispatch)(Cart);
