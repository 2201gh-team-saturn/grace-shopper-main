import React, { Component } from 'react';
import { Footer } from './Footer';
import axios from 'axios';
import SimpleImageSlider from 'react-simple-image-slider';


/**
 * COMPONENT
 */
class HomePage extends Component {
  state = {
    reviews: [],
  };

  async componentDidMount() {
    try {
      const { data } = await axios.get('/api/reviews');
      const reviews = data;
      this.setState({ reviews });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const images = [
      {
        url: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      },
      {
        url: 'https://www.smartertravel.com/wp-content/uploads/2019/04/fantasy-land-hotel-space-room.jpg',
      },
      {
        url: 'https://cf.bstatic.com/data/xphoto/1182x887/303/30357696.jpg?size=S',
      },
      { url: 'http://a1.typepad.com/6a01761762a570970c01b8d1769999970c-pi' },
      {
        url: 'https://www.cheatsheet.com/wp-content/uploads/2018/01/Game-of-thrones-Ice-hotel-Lapland.jpg',
      },
      {
        url: 'https://www.masseriatorrecoccaro.com/immagini/sistema/news/foto/foto_267_7.jpg',
      },
      {
        url: 'https://images2.minutemediacdn.com/image/fetch/w_2000,h_2000,c_fit/https%3A%2F%2Fwinteriscoming.net%2Ffiles%2F2019%2F05%2F804-Drogon-and-Rhaegal-fly-at-Dragonstone.jpg',
      },
    ];
    const reviews = this.state.reviews;
    return (
      <div>
        <div className='homepage_subtitle'>
          <h2>
            Welcome to the <b>reverie</b> resort
            <span>One place, another world</span>
          </h2>
        </div>
        <div className='homepage_container'>
          <div className='slider'>
            <SimpleImageSlider
              width={'48%'}
              height={600}
              images={images}
              showBullets={true}
              showNavs={true}
            />
          </div>
        
          <div className='reviews_container'>
            {/* {reviews
              ? reviews.map((review) => (
                  <p key={review.id}>
                    "{review.review_text}" - From {review.user.username}
                  </p>
                ))
              : ''} */}
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
