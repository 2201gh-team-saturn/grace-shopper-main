//thank you for your booking user.name! //how do I get this here?

//we look forward to making your dreams come true
//travel check list?
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Footer } from './Footer';
import { fetchUsers } from '../store/users';
import Emoji from 'a11y-react-emoji';

class BookingConfirmation extends Component {
  componentDidMount() {
    this.props.loadUsers();
  }
  render() {
    const { username } = this.props;
    return (
      <>
        <div id='booking_container'>
          <div className='booking_inner_container'>
            <h2 className='booking_text' id='booking_title'>
              Congratulations {username}! Your Booking's Complete!{' '}
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
          </div>
        </div>
        <Footer />
      </>
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
