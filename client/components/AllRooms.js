import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRooms, deleteRoomThunk } from '../store/rooms';

export class AllRooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      banana: null,
      // rooms: [],
      // user: {},
      // isLoggedIn: false
    };
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.props.loadRooms();
  }

  addToCart() {
    if (!this.props.isLoggedIn) {
      let localStorageCart = JSON.parse(localStorage.getItem("cart") || "[]");
      localStorageCart.push(this.state.banana);
      localStorage.setItem("cart", JSON.stringify(localStorageCart));
    }
  }

  render() {
    const user = this.props.user;
    const rooms = this.props.rooms;
    const isLoggedIn = this.props.isLoggedIn;
  
    if (rooms.length <= 0) {
      return (
        <div>
          <main>
            <Link to={'/room/add'}>
              <div className='button_container'>
                <button type='button' className='add_room_btn'>
                  Add Room
                </button>
              </div>
            </Link>
            <br />
            <span> There are no rooms registered in the database</span>
            <p> Please add a room</p>
          </main>
        </div>
      );
    }

    return (
      <div className='all_rooms_container'>
        {user.type === 'employee' ? (
          <Link to={'/room/add'}>
            <div className='button_container'>
              <button type='button' className='add_room_btn'>
                Add a Room
              </button>
            </div>
          </Link>
        ) : (
          ''
        )}

        <div className='rooms'>
          {rooms.map((room) => (
            <div className='room' key={room.id}>
              <Link to={`/rooms/${room.id}`}>
                <h2>{room.name}</h2>
              </Link>
              <img src={room.imageUrl} />
              <div className='room-card'>
                <p>
                  <Link to={`/rooms/${room.id}`} room={room}>
                  </Link>
                  <span>Description: </span>
                  {room.description}
                  <br />
                  <span> Price/night: </span> ${room.price}
                  <br />
                  <span>Theme: </span>
                  {room.themes
                    ? room.themes.map((theme) => {
                      return theme.name;
                    })
                    : ''}
                  <br />
                  <span>Availability: </span>{' '}
                  {room.available ? 'Available' : 'Booked'}
                </p>
              <div className="all-rooms-buttons">
                {user.type === 'employee' ? (
                  <form>
                    <button
                      type='submit'
                      className='room_delete_btn'
                      value={room.id}
                      onClick={(event) =>
                        this.props.deleteRooms(event.target.value)
                      }
                    >
                      Remove Room
                    </button>
                  </form>
                ) : (
                  ''
                )}
                <form>
                  {isLoggedIn &&
                    <button
                      type='submit'
                      className='room-add-cart-btn'
                    // value={cartItem.id}
                    // onClick={(event) =>
                    //   this.props.addRoomToCart(event.target.value)
                    // }
                    >
                      Add to Cart
                    </button>}
                </form>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    rooms: state.roomsReducer,
    user: state.auth,
    isLoggedIn: !!state.auth.id
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    loadRooms: () => dispatch(fetchRooms()),
    deleteRooms: (id) => dispatch(deleteRoomThunk(id, history)),
    //addRoomToCart: (id) => dispatch(addRoomToCartThunk(id))
  };
};
export default connect(mapState, mapDispatch)(AllRooms);
