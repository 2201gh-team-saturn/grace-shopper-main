import axios from 'axios'

const SET_ROOMS= 'SET_ROOMS';
const ADD_ROOM = 'ADD_ROOM';
const DELETE_ROOM = 'DELETE_ROOM';
const UPDATE_ROOM = 'UPDATE_EXPERIENCE';
const TOKEN = 'token'

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

  const _updateRoom = (newRoom) => {
    return { type: UPDATE_ROOM, updatedRoom: newRoom };
  };

export const fetchRooms = () => {
    return async (dispatch) => {
      try {
        const token = window.localStorage.getItem(TOKEN);
        const { data } = await axios.get('/api/rooms', {
          headers: {
            authorization: token
          }
        });
        dispatch(setRooms(data));
      } catch (error) {
        console.log(error);
      }
    }
  };

  export const addRoomThunk = (room) => {
    return async (dispatch) => {
      try {
        const token = window.localStorage.getItem(TOKEN);
        const { data: created } = await axios.post('/api/rooms', room,{
          headers: {
            authorization: token
          }
        });
        dispatch(addRoom(created));
      } catch (error) {
        console.log(error);
      }
    };
  };

  export const deleteRoomThunk = (roomId, history) => {
    return async (dispatch) => {
      try {
        const token = window.localStorage.getItem(TOKEN);
        const { data: deleted} = await axios.delete(`/api/rooms/${roomId}`,{
          headers: {
            authorization: token
          }
        });
        dispatch(deleteRoom(deleted));
        history.push('/');
      } catch (error) {
        console.log(error);
      }
    };
  };

  export const updateRoom = (id, roomToUpdate, history) => {
    return async (dispatch) => {
      const token = window.localStorage.getItem(TOKEN);
      const response = await axios.put(`/api/experiences/${id}`, roomToUpdate, {
        headers: {
          authorization: token
        }
      });
      const updatedRoom = response.data;
      dispatch(_updateRoom(updatedRoom));
      history.push('/');
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
      case UPDATE_ROOM:
      let newRooms = [...state];
      newRooms = newRooms.map((room) => {
        if (room.id === action.updatedRoom.id) {
          return action.updatedRoom;
        }
        return room;
      });
      return  [...state, newRooms];
    default:
      return state;
  }
};
