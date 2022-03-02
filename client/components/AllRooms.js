import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRooms, deleteRoomThunk } from '../store/rooms';

export class AllRooms extends React.Component {
  componentDidMount() {
    this.props.loadRooms();
  }

  render() {
    if (this.props.rooms.length <= 0) {
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
          <br/>
          <span> There are no rooms registered in the database</span>
          <p> Please add a room</p>
          </main>
        </div>
       
      );
    }
    return (
      <div>
          <Link to={'/room/add'}>
            <div className='button_container'>
              <button type='button' className='add_room_btn'>
                Add Rooms
              </button>
            </div>
          </Link>
        <div className='rooms'>
          {this.props.rooms.map((room) => (
            <div className='room' key={room.id}>
              <img src={room.imageUrl} />
              <div className='room_card'>
                <p>
                  <Link to={`/rooms/${room.id}`}>
                      Name: {room.name}
                  </Link>
                  <br />
                  Description: {room.description}
                  <br />
                  Price/night: ${room.price}
                  <br />
                  Category: {room.category}
                  <br />
                  Availability: {room.available ? "Available" : "Booked"}
                </p>
                <form>
                  <button
                    type='submit'
                    className='room_delete_btn'
                    value={room.id}
                    onClick={(event) =>
                      this.props.deleteRoom(event.target.value)
                    }
                  >
                    Remove Room
                  </button>
                </form>
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
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    loadRooms: () => dispatch(fetchRooms()),
    deleteRooms: (id) => dispatch(deleteRoomThunk(id, history)),
  };
};
export default connect(mapState, mapDispatch)(AllRooms);
