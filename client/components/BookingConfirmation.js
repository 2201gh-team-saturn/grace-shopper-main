//thank you for your booking user.name! //how do I get this here?

//hooray ikon, RR ikon?
//we look forward to making your dreams come true
//travel check list?
import React, { Component } from 'react';
import { Footer } from './Footer';

class BookingConfirmation extends Component {
  // async componentDidMount() {
  //   try {
  //     const { data } = await axios.get('/api/reviews');
  //     const reviews = data;
  //     this.setState({reviews});
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  render() {
    return (
      <div>
        <h2>Congratulations (User) Your Booking's Complete!'! </h2>
        <div className='booking_confirmation_container'>
          <img
            className='homepage_img'
            src='https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
          />

          <div className='reviews_container'>
            <h3> See what others have to say: </h3>
            {reviews
              ? reviews.map((review) => (
                  <p key={review.id}>
                    "{review.review_text}"<span> - {review.user.username}</span>
                  </p>
                ))
              : ''}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default BookingConfirmation;
