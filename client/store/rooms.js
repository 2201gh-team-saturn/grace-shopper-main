const SET_ROOMS= 'SET_ROOMS';
const ADD_ROOM = 'ADD_ROOM'
const DELETE_ROOM = 'DELETE_ROOM'

export const setRooms = (rooms) => {
    return {
      type: SET_ROOMS,
      rooms
    }
  };

  export const addRoom = (room) => {
    return {
      type: ADD_ROOM,
      room
    }
  }; 

  export const deleteRoom = (room) => {
    return {
      type: DELETE_ROOM,
      room
    }
  }; 

export const fetchRooms = () => {
    return async (dispatch) => {
      try {
        const { data } = await axios.get('/api/rooms');
        dispatch(setRooms(data));
      } catch (error) {
        console.log(error);
      }
    }
  };

  export const addRoomThunk = (room) => {
    return async (dispatch) => {
      try {
        const { data: created } = await axios.post('/api/rooms', room);
        dispatch(addRoom(created));
      } catch (error) {
        console.log(error);
      }
    };
  };

  export const deleteRoomThunk = (roomId, history) => {
    return async (dispatch) => {
      try {
        const { data: deleted} = await axios.delete(`/api/rooms/${roomId}`);
        dispatch(deleteRoom(deleted));
        history.push('/');
      } catch (error) {
        console.log(error);
      }
    };
  };

  const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ROOMS:
      return action.rooms;
      case ADD_ROOM:
        return [...state, action.room];
      case DELETE_ROOM:
      return state.filter((room) => room.id !== action.room.id);
    default:
      return state;
  }
};