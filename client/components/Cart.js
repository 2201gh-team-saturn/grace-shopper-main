import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchShoppingCart,
  increaseQuantity,
  decreaseQuantity,
  clearAllCartItems,
} from '../store/shopping_cart';
import { fetchUsers } from '../store/users';
import { addReservation } from '../store/reservations';
import { deleteCartItemThunk } from '../store/cartItems';
import BookingConfirmation from './BookingConfirmation';

class Cart extends Component {
	constructor(props) {
		super(props)
		this.increase = this.increase.bind(this);
		this.decrease = this.decrease.bind(this);
		this.handleCheckout = this.handleCheckout.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}
	componentDidMount() {
		// this.props.loadCart(this.props.user.id);
		this.props.fetchCart(this.props.userId);
	}
	increase(id) {
		this.props.increaseQuantity(id);
	}

	decrease(id) {
		this.props.decreaseQuantity(id);
	}
  handleCheckout() {
    // this.props.addReservation(roomId);
    this.props.checkoutCart();
	window.location.href = '/booking-confirmation';
  }
  handleDelete(id) {
    this.props.deleteCartItem(id);
    window.location.reload();
  }

  render() {
    const user = this.props.user;
    const items = this.props.cartItems;
    const totalItems = this.props.cartItems[0];

    return (
      <div>
        <div className='cart_container'>
          <h3> {user.username}'s Cart</h3>
             {items.map((item) => {
            const disabledIncrease = (item.numberOfNights === 30);
            const disabledDecrease = (item.numberOfNights === 1);
            return (
              <div className='cart_format' key={item.id}>
                <img className='cart_img' src={item.room.imageUrl} />
                <div className='cartItemInfo'>
                  <p>{item.room.name}</p>
                  <p> Price/night: ${item.room.price}</p>
                  <p>
                    Number of nights:
                    <button
                      disabled={disabledDecrease}
                      onClick={() => this.decrease(item.id)}
                    >
                      -
                    </button>
                    {item.numberOfNights}
                    <button
                      disabled={disabledIncrease}
                      onClick={() => this.increase(item.id)}
                    >
                      +
                    </button>
                  </p>
                  <button
                    type='submit'
                    className='room_delete_btn'
                    value={item.id}
                    // onClick={(event) => this.props.deleteCartItem(event.target.value)}
                    onClick={(event) => this.handleDelete(event.target.value)}
                  >
                    Remove Item
                  </button>
                </div>
              </div>
            );
          })}
          {totalItems ? (
            <div className='cart_summary'>
              <h4>
                Total Amount of Days:
                {items.reduce((total, item) => {
                  return total + item.numberOfNights;
                }, 0)}
                <br />
                Total Price: $
                {items.reduce((total, item) => {
                  return total + item.numberOfNights * item.room.price;
                }, 0)}
              </h4>
              <Link to={'/booking-confirmation'}>
							<button
								type='submit'
								className='room_delete_btn'
								value={items}
								onClick={(event) => this.handleCheckout(event.target.value) }> Check Out</button>
							</Link>
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

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchCart: (userId) => dispatch(fetchShoppingCart(userId)),
    increaseQuantity: (id) => dispatch(increaseQuantity(id)),
    decreaseQuantity: (id) => dispatch(decreaseQuantity(id)),
    checkoutCart: () => dispatch(clearAllCartItems()),
    createReservation: (roomId) => dispatch(addReservation(roomId)),
    deleteCartItem: (id) => dispatch(deleteCartItemThunk(id, history)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
