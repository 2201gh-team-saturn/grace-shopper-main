import axios from 'axios';
import history from '../history';

const TOKEN = 'token';

//const ADD_CART = 'ADD_CART';
const SET_SHOPPING_CART = 'SET_SHOPPING_CART';
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
const DELETE_CART_ITEM = 'DELETE_CART_ITEM';
const UPDATE_CART = 'UPDATE_CART';
const CLEAR_CART = 'CLEAR_CART'
const ADD_ROOM_TO_CART = 'ADD_ROOM_TO_CART';

//cart action creators
export const setShoppingCart = (cart) => {
  return {
    type: SET_SHOPPING_CART,
    cart,
  };
};

export const _updateCart = (cart) => {
  return {
    type: UPDATE_CART,
    updatedCart: cart,
  };
};
export const updateCartItem = (cartItem) => {
  return {
    type: UPDATE_CART_ITEM,
    cartItem,
  };
};

export const clearCart = (cart) => {
  return {
    type: CLEAR_CART,
    cart,
  };
};

export const addRoomToCart = (cartItem) => {
  return {
    type: ADD_ROOM_TO_CART,
    cartItem,
  };
};
export const _deleteCartItem = (cartItem) => {
  return {
    type: DELETE_CART_ITEM,
    cartItem,
  };
};

//Thunk Creators
export const fetchShoppingCart = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data: cart } = await axios.get(`/api/cart`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(setShoppingCart(cart));
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeFromCart = (cartItemId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data } = await axios.delete(
        `/api/cart`,
        {
          data: {
            cartItemId: cartItemId,
          },
        },
        {
          headers: {

            authorization: token,
          },
        }
      );
      dispatch(_deleteCartItem(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateCartThunk = (cart, history) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    const { data: updated } = await axios.put(`/api/cart`, cart, {
      headers: {
        authorization: token,
      },
    });
    dispatch(_updateCart(updated));
    history.push(`/`);
  };
};
export const increaseQuantity = (id) => async (dispatch) => { //we arent sending data here
  const token = window.localStorage.getItem(TOKEN);
  const {data} = await axios.put(`/api/cart/increase/${id}`,
  {
    headers :{
      authorization: token
    }
  }
  );
  dispatch(fetchShoppingCart());
}

export const decreaseQuantity = (id) => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  const {data} = await axios.put(`/api/cart/decrease/${id}`,
  {
    headers: {
      authorization: token
    }
  }
  );
  dispatch(fetchShoppingCart());
}

export const clearAllCartItems = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data } = await axios.delete(`/api/cart/checkout`,
        {
          headers: {
            authorization: token
          }
        });
      dispatch(clearCart(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createCartItem = (roomId) => {
  return async (dispatch) => {
    try {
      console.log(roomId);
      const token = window.localStorage.getItem(TOKEN);
      const { data: created } = await axios.post(
        '/api/cart/addToCart',
        // numberOfNights,
        roomId,
        {
          headers: {
            authorization: token
          }
        }
      );
      dispatch(addRoomToCart(created));
    } catch (error) {
      console.error('theres something wrong with your add room to cart thunk');
      console.log(error);
    }
  };
};

// const initialState = {};
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SHOPPING_CART:
      return action.cart;
    case UPDATE_CART:
      return action.cart;
    case UPDATE_CART_ITEM:
      return action.cartItem;
    case CLEAR_CART:
      return action.cart;
    case ADD_ROOM_TO_CART: //this might be a problem?
      return [...state, action.cartItem];
    default:
      return state;
  }
};


