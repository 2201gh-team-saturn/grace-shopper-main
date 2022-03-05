//thank you for your booking user.name! //how do I get this here?

//we look forward to making your dreams come true
//travel check list?
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Footer } from './Footer';
import { fetchUsers } from '../store/users';
import Emoji from 'a11y-react-emoji'

class BookingConfirmation extends Component {
  componentDidMount() {
    this.props.loadUsers();
  }
  render() {
    const  {username}  = this.props;
    return (
      <div>
        <h2 className='booking_text'>Congratulations {username}! Your Booking's Complete! </h2>
        <h3 className='booking_text'>Here's your packing list:</h3>
        <p className='booking_text'><Emoji symbol="☀️" label="sun" /> A sunny disposition</p>
        <p className='booking_text'><Emoji symbol="😏" label="smirk" /> A sense of adventure</p>
        <p className='booking_text'><Emoji symbol="🍌" label="banana" /> A snack for later</p>
        {/* <ul className='booking_text'>
          <li> A sunny disposition</li>
          <li>Your passport </li>
          <li>A sense of adventure</li>
          <li>A snack</li>
         </ul> */}
        <div className='booking_confirmation_container'>
          <img
            className='booking_confirmation_img'
            src='https://images.unsplash.com/photo-1519834785169-98be25ec3f84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2VsZWJyYXRlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
          />
        </div>
            <h3 className='booking_text'>We look forward to making your dreams come true</h3>
        <Footer />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    username: state.auth.username,
    user: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapState, mapDispatchToProps)(BookingConfirmation);
