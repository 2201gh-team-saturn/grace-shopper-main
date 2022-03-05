import React, {Component} from 'react';
import { Footer } from './Footer';
import axios from 'axios'

/**
 * COMPONENT
 */
class HomePage extends Component {
  state = {
   reviews: []
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get('/api/reviews');
      const reviews = data;
      this.setState({reviews});
    } catch (error) {
      console.log(error);
    }
  }

  render() {
   const reviews = this.state.reviews
    return (
    <div>
      <h2>Welcome to the Reverie Resort! </h2>
      <div className='homepage_container'>
        <img
          className='homepage_img'
          src='https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
        />

        <div className='reviews_container'>
        <h3> See what others have to say: </h3>
         { reviews ? reviews.map((review) =>
            <p key={review.id}>"{review.review_text}"
            <span>  -  {review.user.username}</span>
            </p>
         ) : ""
        }
        </div>
      </div>
      <Footer />
    </div>
  );
}
}

/**
 * CONTAINER
 */

export default HomePage;
