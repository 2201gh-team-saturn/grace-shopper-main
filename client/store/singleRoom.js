import axios from 'axios';

////ACTION TYPES
const SET_ROOM = 'SET_ROOM';
const TOGGLE_AVAILABLE = 'TOGGLE_AVAILABLE';
const UPDATE_ROOM = 'UPDATE_EXPERIENCE';

//ACTION CREATORS
const setRoom = (room) => {
  return {
    type: SET_ROOM,
    room,
  };
};
const toggleAvailable = (availability) => {
  return {
    type: TOGGLE_AVAILABLE,
    availability,
  };
};

const _updateRoom = (newRoom) => {
  return { type: UPDATE_ROOM, updatedRoom: newRoom };
};

//THUNK CREATORS
export const fetchRoom = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/rooms/${id}`);
      dispatch(setRoom(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const toggleStatus = (id, availability) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/rooms/${id}`, {
        available: !availability,
      });
      dispatch(toggleAvailable(data.available));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateRoom = (id, roomToUpdate, history) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/experiences/${id}`, roomToUpdate);
    const updatedRoom = response.data;
    dispatch(_updateRoom(updatedRoom));
    history.push('/');
  };
};

export default function singleRoomReducer(state = {}, action) {
  switch (action.type) {
    case SET_ROOM:
      return action.room;
    case TOGGLE_AVAILABLE:
      return { ...state, available: action.availability };
    case UPDATE_ROOM:
      let newRooms = [...state];
      newRooms = newRooms.map((room) => {
        if (room.id === action.updatedRoom.id) {
          return action.updatedRoom;
        }
        return room;
      });
      return { ...state, newRooms };
    default:
      return state;
  }
}
