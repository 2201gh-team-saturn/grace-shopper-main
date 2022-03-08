import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchShoppingCart, deleteRoomThunk } from '../store/shopping_cart';
import { fetchUsers } from '../store/users';

class Cart extends Component {
  componentDidMount() {
   // this.props.loadCart(this.props.user.id);
    this.props.fetchCart(this.props.userId);
  }
  render() {
    console.log(this.props);
    // console.log(this.props.user);
    const user = this.props.user;
    const items = this.props.cartItems;
    const totalItems = this.props.cartItems[0];

    // JOE CR: I ain't gonna yell at ya for leaving console.logs around because this is a work in progress,
    // but instead I want to highlight how awesome this is and something that programmers forget they can and
    // should do. Let's discuss!
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
                 items.reduce((total, item )=> {
                  return total + item.numberOfNights
              },0)
            } 
            <br/>
             Total Price: ${
                    items.reduce((total, item )=> {
                        return total + item.room.price
                    },0)
              }
            </h4>
            <button>Check Out</button>
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
      fetchCart: (userId) => dispatch(fetchShoppingCart(userId)),
  };
};
export default connect(mapState, mapDispatch)(Cart);



