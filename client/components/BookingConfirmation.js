//thank you for your booking user.name! //how do I get this here?

//we look forward to making your dreams come true
//travel check list?
import React, { Component } from 'react';
import { Footer } from './Footer';

class BookingConfirmation extends Component {
  render() {
    return (
      <div>
        <h2 className='booking_text'>Congratulations (User) Your Booking's Complete! </h2>
        <div className='booking_confirmation_container'>
          <img
            className='booking_confirmation_img'
            src='https://images.unsplash.com/photo-1519834785169-98be25ec3f84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2VsZWJyYXRlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
          />
          <div>
          </div>
        </div>
            <h3 className='booking_text'>We look forward to making your dreams come true</h3>
        <Footer />
      </div>
    );
  }
}

export default BookingConfirmation;
