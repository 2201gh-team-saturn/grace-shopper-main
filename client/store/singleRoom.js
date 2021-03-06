import axios from 'axios';

////ACTION TYPES
const SET_ROOM = 'SET_ROOM';
const TOGGLE_AVAILABLE = 'TOGGLE_AVAILABLE';
const UPDATE_ROOM = 'UPDATE_ROOM'
const TOKEN = 'token'

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

const updateRoom = (room) => {
  return {
    type: UPDATE_ROOM,
    room,
  };
};

//THUNK CREATORS
export const fetchRoom = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data } = await axios.get(`/api/rooms/${id}`, {
        headers: {
          authorization: token
        }
      });
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

export const updateRoomThunk = (room, history) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    const { data: updated } = await axios.put(`/api/rooms/${room.id}`, room, {
      headers: {
        authorization: token
      }
    });
    dispatch(updateRoom(updated));
    history.push('/rooms');
  };
};

export default function singleRoomReducer(state = {}, action) {
  switch (action.type) {
    case SET_ROOM:
      return action.room;
    case TOGGLE_AVAILABLE:
      return { ...state, available: action.availability };
    case UPDATE_ROOM:
        return action.room;
    default:
      return state;
  }
}
