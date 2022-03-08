import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchShoppingCart, deleteRoomThunk } from '../store/shopping_cart';
import { fetchUsers } from '../store/users';

class Cart extends Component {
  constructor(props){
    super(props)
    // this.increase = this.increase.bind(this);
    // this.decrease = this.decrease.bind(this);
  }
  componentDidMount() {
   // this.props.loadCart(this.props.user.id);
//    console.log('hello',this.props.userId)
//    console.log(this.props.cartItems.numberOfNights)
    this.props.fetchCart(this.props.userId);
  }
//   increase() {
//     this.props.increaseQuantity(this.props.userId.items.numberOfNights);
//   }

//   decrease() {
//     this.props.decreaseQuantity(this.props.userId);
//   }
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
    const didUserClick = false
    // const disabledIncrease = (item.numberOfNights === 10);
    // const disabledDecrease = (item.numberOfNights === 0);
    
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
                  <button className='cart_btn' onClick={()=> didUserClick === true}>Edit Dates</button>
                  {didUserClick ? (
                      <div>
                        Number numberOfNights: 
                     <form>
                    <Button disabled={disabledDecrease} onClick={this.decrease}>-
                    </Button>
                              
                              
                           {item.numberOfNights}
                    <Button disabled={disabledIncrease} onClick={this.increase} >+</Button> 
                    <button
                      type='submit'
                      className='room_delete_btn'
                      value={item.id}
                      onClick={(event) =>
                        this.props.deleteCartItem(event.target.value)
                      }
                    >
                      Remove Item
                    </button>
                  </form>
                      </div>

                  ) : ('')}
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
    //   increaseQuantity: (id) => dispatch(increaseQuantity(id)),
    //   decreaseQuantity: (id) => dispatch(decreaseQuantity(id))
  };
};
export default connect(mapState, mapDispatch)(Cart);



