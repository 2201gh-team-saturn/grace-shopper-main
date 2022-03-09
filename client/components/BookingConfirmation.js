//thank you for your booking user.name! //how do I get this here?

//we look forward to making your dreams come true
//travel check list?
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Footer } from './Footer';
import { fetchUsers } from '../store/users';
import { fetchShoppingCart } from '../store/shopping_cart';
import Emoji from 'a11y-react-emoji';
import { Link } from 'react-router-dom';

class BookingConfirmation extends Component {
  componentDidMount() {
    this.props.loadUsers();
    this.props.fetchCart(this.props.userId);
  }
  render() {
    const { firstName } = this.props;
    const items = this.props.cartItems;
    console.log(items)
    return (
      <>
        <div id='booking_container'>
        
          <div className='booking_inner_container'>
            <h2 className='booking_text' id='booking_title'>
              Congratulations {firstName}! Your Booking's Complete!{' '}
            </h2>
            <div id='packing_list'>
              <h3 className='booking_text'>Here's your packing list:</h3>
              <p className='booking_text'>
                <Emoji symbol='☀️' label='sun' className='emoji' />A sunny
                disposition{' '}
              </p>
              <p className='booking_text'>
                <Emoji symbol='😏' label='smirk' className='emoji' />A sense of
                adventure
              </p>
              <p className='booking_text'>
                <Emoji symbol='🍌' label='banana' className='emoji' />A snack
                for later
              </p>
            </div>
            <h3 className='booking_text' id='dreams_text'>
              We look forward to making your dreams come true
            </h3>

			            

	

                {/* Here's your confirmation:  */}
                {items ? ( 
                     <div>
                     {items.map((item)=>{
                      <h1> !!!!!!!!!!!!!!!!!!!!!!! {item.numberOfNights}</h1> 
                      {console.log(item.numberOfNights)}
                     })}
                    </div>

                ) : "" }
               
          </div>
          {/* <Link to={"/cart"}>Go Back to Cart</Link> */}
        </div>
      
        <Footer />
      </>
    );
  }
}

const mapState = (state) => {
  return {
    firstName: state.auth.firstName,
    userId: state.auth.id,
    cartItems: state.shopping_cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: () => dispatch(fetchUsers()),
    fetchCart: (userId) => dispatch(fetchShoppingCart(userId)),
  };
};

export default connect(mapState, mapDispatchToProps)(BookingConfirmation);
