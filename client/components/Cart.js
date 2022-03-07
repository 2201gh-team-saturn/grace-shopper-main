import React, {Component} from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {fetchShoppingCart} from '../store/shopping_cart';


// dummyData = {
//     rooms: [
//         {id:1,name:'Winter body', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 110.00},
//         {id:2,name:'Adidas', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 80.50},
//         {id:3,name:'Vans', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",price: 120.50},
//     ],
//     totalQuantity: 0
// }

class Cart extends Component {
  
  componentDidMount(){
    this.props.fetchCart(this.props.userId);
  }
  // handleSubmit(event) {
  //   event.preventDefault();
  //   this.props.addRoom({ ...this.state });
  //   this.props.history.push('/rooms')
  //  }

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

// export default Cart;