import axios from "axios";

////ACTION TYPES
const SET_ROOM = 'SET_ROOOM'
const TOGGLE_AVAILABLE = 'TOGGLE_AVAILABLE';

//ACTION CREATORS
const setRoom = (room) => {
    return {
      type: SET_ROOM,
      room
    }
  };
  const toggleAvailable = (availability) => {
    return {
      type: TOGGLE_AVAILABLE,
      availble: availability
    }
  };

//THUNK CREATORS
export const fetchRoom = (id) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(`/api/rooms/${id}`);
        dispatch(setRoom(data));
      } catch (err) {
        console.log(err)
      }
    }
  };

  export const toggleStatus = (id, availability) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(`/api/rooms/${id}`, { availble: !availability });
        dispatch(toggleCompletion(data.availble));
      } catch (err) {
        console.log(err)
      }
    }
  };
  
  export default function singleRoomReducer(state = {}, action) {
    switch (action.type) {
      case SET_ROOM:
        return action.room
      case TOGGLE_AVAILABLE:
        return { ...state, availble: action.availability };
      default:
        return state
    }
  }  
