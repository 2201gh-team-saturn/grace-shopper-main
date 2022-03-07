import axios from 'axios'

const SET_USERS= 'SET_USERS';
const TOKEN = 'token'

export const setUsers = (users) => {
    return {
      type: SET_USERS,
      users
    }
  };

export const fetchUsers = () => {
    return async (dispatch) => {
      try {
        const token = window.localStorage.getItem(TOKEN);
        const { data } = await axios.get('/api/users', {
          headers: {
            authorization: token
          }
        });
        dispatch(setUsers(data));
      } catch (error) {
        console.log(error);
      }
    }
  };

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    default:
      return state;
  }
};