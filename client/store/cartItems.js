import axios from 'axios';

const TOKEN = 'token';

const SET_CART_ITEMS = 'SET_CART_ITEMS';
const ADD_CART_ITEM = 'ADD_CART_ITEM';
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
const DELETE_CART_ITEM = 'DELETE_CART_ITEM';

export const setCartItems = (cartItems) => {
  return {
    type: SET_CART_ITEMS,
    cartItems,
  };
};

export const _addCartItem = (cartItem) => {
  return {
    type: ADD_CART_ITEM,
    cartItem,
  };
};

export const _deleteCartItem = (cartItem) => {
  return {
    type: DELETE_CART_ITEM,
    cartItem,
  }
};

export const _updateCartItem = (newCartItem) => {
  return { type: UPDATE_CART_ITEM,
    updatedCartItem: newCartItem }
};

export const fetchCartItems = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data: cartItems } = await axios.get('/api/cartItem', {
        headers: {
          authorization: token
        }
      });
      dispatch(setCartItems(cartItems));
    } catch (err) {
      console.error('I have zero experience here');
      console.log(err);
    }
  };
};

export const addCartItem = (numberOfNights) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data: created } = await axios.post(
        '/api/cartItem',
        numberOfNights
        , {
          headers: {
            authorization: token
          }
        });
      dispatch(_addCartItem(created));
    } catch (error) {
      console.error('theres something wrong with your add cart item thunk');
      console.log(error);
    }
  };
};

export const increaseQuantity = (id) => async (dispatch) => {
  // const token = window.localStorage.getItem(TOKEN);
  const {data} = await axios.put(`/api/cart`,id 
  // {
  //   // headers :{
  //   //   authorization: token
  //   // }
  // }
  );
  dispatch(updatedQuantity(data));
}

export const decreaseQuantity = (id) => async (dispatch) => {
  // const token = window.localStorage.getItem(TOKEN);
  const {data} = await axios.put(`/api/cart`,id
  // {
  //   // headers: {
  //   //   authorization: token
  //   // }
  // }
  );
  dispatch(updatedQuantity(data));
}

export const deleteCartItem = (id, history) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    const { data: cartItem } = await axios.delete(`/api/cartItem/${id}`, {
      headers: {
        authorization: token
      }
    });
    dispatch(_deleteCartItem(cartItem));
    history.push('/');
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CART_ITEMS:
      return action.experiences;
    case ADD_CART_ITEM:
      return [...state, action.experience];
    case DELETE_CART_ITEM:
      return state.filter(
        (experience) => experience.id !== action.experience.id
      );
    default:
      return state;
  }
}


