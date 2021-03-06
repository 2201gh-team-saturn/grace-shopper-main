import React from 'react';
import { connect } from 'react-redux';
import { fetchRoom } from '../store/singleRoom';
import { fetchExperiences } from '../store/experiences';
import { Link } from 'react-router-dom';
import { createCartItem } from '../store/shopping_cart';
import { me } from '../store';

class SingleRoom extends React.Component {
  constructor(props) {
    super(props);
    //this.addToCart = this.addToCart.bind(this);
  }
  componentDidMount() {
    this.props.loadRoom(this.props.match.params.id);
    this.props.loadExperiences();
    // this.props.isLoggedIn();
  }

  addToCart(room) {
    if (!this.props.isLoggedIn) {
      let localStorageCart = JSON.parse(localStorage.getItem('cart') || '[]');
      localStorageCart.push(room);
      localStorage.setItem('cart', JSON.stringify(localStorageCart));
    }
  }

  render() {
    const room = this.props.room;
    console.log('THIS IS THE ID', room.id);
    const experiences = this.props.experiences.filter(
      (experience) => experience.roomId === room.id
    );
    const isLoggedIn = this.props.isLoggedIn;
    const isAdmin = this.props.isAdmin;
    const experienceList = experiences.map((experience) => {
      let id = experience.id;
      return (
        <div key={id}>
          <Link to={`/experiences/${id}`}>
            <li>{experience.name}</li>
          </Link>
        </div>
      );
    });
    return (
      <div className='single-room'>
        <div className='room-info'>
          <div id='single-room-img'>
            <img src={room.imageUrl} />
            <div className='single-room-links'>
              <Link to='/rooms'>Go Back</Link>
              <br />
              {/* add security here */}
              {isAdmin && (
                <Link to={`/rooms/${this.props.match.params.id}/edit`}>
                  Update Room
                </Link>
              )}
            </div>
          </div>
          <div id='room_info_desc'>
            <h1>{room.name}</h1>
            <p>{room.description}</p>
            <div className='room-info__checks'>
              <div className='room-info__check'>
                <span className='room-info__check-title'>Check in </span>
                <span className='room-info__check-time'>3 - 5 PM</span>
              </div>

              <div className='room-info__check'>
                <span className='room-info__check-title'>Check out </span>
                <span className='room-info__check-time'>12 - 2 PM</span>
              </div>
            </div>
            <div>
              <p>Experiences you can only have in this room:</p>
              <ul>
                {(experiences.length > 0 && experienceList) ||
                  (experiences.length === 0 && (
                    <li>Check back soon for new experiences</li>
                  ))}
              </ul>
              {isLoggedIn && (
                <button
                  type='button'
                  id='add_to_cart_btn'
                  className='button'
                  onClick={() => {
                    this.props.addToCart(room.id);
                  }}
                >
                  Add to Cart
                </button>
              )}
              {!isLoggedIn && (
                <button
                  type='button'
                  id='add_to_cart_btn'
                  className='button'
                  value={room}
                  onClick={this.addToCart(room)}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>

        <div></div>
      </div>
    );
  }
}

//if your process i normally just add room to cart, then you can do the same thing
//but with local storage.

const mapState = (state) => {
  return {
    room: state.singleRoomReducer,
    user: state.auth,
    experiences: state.experiencesReducer,
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.type === 'employee',
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadRoom: (id) => dispatch(fetchRoom(id)),
    loadExperiences: () => dispatch(fetchExperiences()),
    addToCart: (id) => dispatch(createCartItem(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleRoom);
