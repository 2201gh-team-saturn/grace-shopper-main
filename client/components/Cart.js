// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { fetchShoppingCart, deleteRoomThunk } from '../store/shopping_cart';
// import { fetchUsers } from '../store/users';

// class Cart extends Component {
//   componentDidMount() {
//     this.props.loadCart(this.props.user.id);
//   }
//   render() {
//     console.log(this.props.cartItems);
//     // console.log(this.props.user);
//     const user = this.props.user;
//     const items = this.props.cartItems;
//     const totalItems = this.props.cartItems[0];

//     if (totalItems) {
//       console.log(totalItems.carts[0].totalQuantity);
//     }

//     //const {room} = this.props.cart
//     // console.log(room);
//     return (
//       <div>
//         <div className='cart_container'>
//           <h3> {user.username}'s Cart</h3>
//           {items.map((item) => {
//             return (
//               <div className='cart_format' key={item.id}>
//                 <img className='cart_img' src={item.room.imageUrl} />

//                 <div className='cartItemInfo'>
//                   <p>{item.room.name}</p>
//                   <p> Price: ${item.room.price}</p>
//                   <p> Number of nights: {item.numberOfNights} </p>
//                   <button className='cart_btn'>Edit Dates</button>
//                 </div>
//               </div>
//             );
//           })}
//           {totalItems ? (
//             <div className="cart_summary">
//             <h4> Total Amount of Days: {totalItems.carts[0].totalQuantity} </h4>
//             <h4> Total Price: ${
//                     items.reduce((total, item )=> {
//                         return total + item.room.price
//                     },0)
//               }




//             </h4>
//             </div>
//           ) : (
//             ''
//           )}
//         </div>
//       </div>
//     );
//   }
// }

// const mapState = (state) => {
//   return {
//     cartItems: state.shopping_cart,
//     // user: state.auth,
//     user: state.auth,
//     // user: state.auth,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     // loadRooms: () => dispatch(fetchRooms()),
//     loadCart: (id) => dispatch(fetchShoppingCart(id)),
//   };
// };
// export default connect(mapState, mapDispatch)(Cart);


import React, {Component} from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {fetchShoppingCart} from '../store/shopping_cart';

class Cart extends Component {
  
  componentDidMount(){
    this.props.fetchCart(this.props.userId);
  }

  render(){

  return (
    <div>Cart</div>

  )
  }
}

const mapState = (state) => {
  return {
    userId: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCart: (userId) => dispatch(fetchShoppingCart(userId)),
  };
};

export default connect(mapState, mapDispatch)(Cart);