import axios from 'axios';
import history from '../history'

const TOKEN = 'token'

const TOKEN = 'token'

const SET_SHOPPING_CART = 'SET_SHOPPING_CART';
const DELETE_CART_ITEM = 'DELETE_CART_ITEM';
const UPDATE_CART = 'UPDATE_CART'

export const setShoppingCart = (cart) => {
  return {
    type: SET_SHOPPING_CART,
    cart,
  };
};

export const deleteCartItem = (cart) => {
  return {
    type: DELETE_CART_ITEM,
    cart,
  };
};

export const updateCart = (cart) => {
  return {
    type: UPDATE_CART,
    cart,
  };
};

//Thunk Creators
export const fetchShoppingCart = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data } = await axios.get(`/api/cart`, {
        headers: {
          authorization: token
        }
      });
      dispatch(setShoppingCart(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeFromCart = (cartId, cartItemId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/cart/${cartId}`, {
        data: {
          cartId: cartId,
          cartItemId: cartItemId,
        },
      });
      dispatch(deleteCartItem(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateCartThunk = (cart, history) => {
  return async (dispatch) => {
    const { data: updated } = await axios.put(`/api/cart/${cart.id}`, cart);
    dispatch(updateCart(updated));
    history.push(`/cart/${cart.id}`);
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SHOPPING_CART:
      return action.cart;
    case DELETE_CART_ITEM:
      return action.cart;
    case UPDATE_CART:
      return action.cart;
    default:
      return state;
  }
};