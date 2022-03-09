import axios from 'axios';

const TOKEN = 'token';

//theres no set Items bc we get that from thee set shopping cart in shopping_cart.js
const ADD_CART_ITEM = 'ADD_CART_ITEM';
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
const DELETE_CART_ITEM = 'DELETE_CART_ITEM';

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
  };
};

export const _updateCartItem = (newCartItem) => {
  return { type: UPDATE_CART_ITEM, updatedCartItem: newCartItem };
};

export const addCartItemThunk = (cartItem) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data: created } = await axios.post('/api/cart/', cartItem, {
        headers: {
          authorization: token,
        },
      });
      dispatch(_addCartItem(created));
    } catch (error) {
      console.error('theres something wrong with your add cart item thunk');
      console.log(error);
    }
  };
};

export const deleteCartItemThunk = (id, history) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    const { data: cartItem } = await axios.delete(`/api/cart`, 
    {
      data: {
        id: id
      }
    }, 
    {
      headers: {
        authorization: token,
      },
    });
    console.log("THIS IS CARTITEM", cartItem)
    dispatch(_deleteCartItem(cartItem));
    history.push('/cart');
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART_ITEM:
      return [...state, action.cartItem];
    case UPDATE_CART_ITEM:
      return action.cartItem;
    case DELETE_CART_ITEM:
      return state.filter(
        (cartItem) => cartItem.id !== action.cartItem.id
      );
    default:
      return state;
  }
};
