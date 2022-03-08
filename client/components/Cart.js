import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchShoppingCart, deleteRoomThunk, increaseQuantity, decreaseQuantity } from '../store/shopping_cart';
import { fetchUsers } from '../store/users';


class Cart extends Component {
	constructor(props) {
		super(props)
		this.increase = this.increase.bind(this);
		this.decrease = this.decrease.bind(this);
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
      render() {
        const user = this.props.user;
        const items = this.props.cartItems;
        const totalItems = this.props.cartItems[0];
		//const {room} = this.props.cart
    
		return (
      <div>
		<div className="cart_container">
			<h3> {user.username}'s Cart</h3>
		{items.map((item) => {
        const disabledIncrease = (item.numberOfNights === 30);
        const disabledDecrease = (item.numberOfNights === 1);
						return (
							<div className="cart_format" key={item.id}>
								<img className="cart_img" src={item.room.imageUrl} />

								<div className="cartItemInfo">
									<p>{item.room.name}</p>
									<p> Price: ${item.room.price}</p>
									<p> Number of nights: 
                  							<button  onClick={()=>this.decrease(item.id)}>-</button>
                    						{item.numberOfNights} 
                    						<button onClick={()=>this.increase(item.id)}>+</button>
                    				</p>
									<button 
									type='submit'
                      className='room_delete_btn'
                      // value={item.id}
                      // onClick={(event) =>
                      //   this.props.deleteCartItem(event.target.value)
                      // }
                    >
                      Remove Item
                    </button>
					</div>
					</div>  );
          })}
					{totalItems ? (
						<div className="cart_summary">
							<h4>
								{' '}
								Total Amount of Days:{' '}
								{items.reduce((total, item) => {
									return total + item.numberOfNights;
								}, 0)}
								<br />
								Total Price: $
								{items.reduce((total, item) => {
									return total + item.room.price;
								}, 0)}
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
		increaseQuantity: (id) => dispatch(increaseQuantity(id)),
		decreaseQuantity: (id) => dispatch(decreaseQuantity(id)),
	};
};
export default connect(mapState, mapDispatch)(Cart);
