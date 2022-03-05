import React, {Component} from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchShoppingCart, deleteRoomThunk } from '../store/shopping_cart';
import { fetchUsers } from '../store/users';

class Cart extends Component {
  componentDidMount(){
    this.props.loadCart(this.props.user.id)
  }
  render(){
  console.log(this.props.cart)
  return (
    <div>Cart</div>
  ) 
  }
}

const mapState = (state) => {
  return {
    cart: state.shopping_cart,
   // user: state.auth,
    user: state.auth
    // user: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    // loadRooms: () => dispatch(fetchRooms()),
   loadCart: (id) => dispatch(fetchShoppingCart(id)),
   
  };
};
export default connect(mapState, mapDispatch)(Cart);
