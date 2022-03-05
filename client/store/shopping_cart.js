import axios from 'axios';

const SET_SHOPPING_CART = 'SET_SHOPPING_CART';
const DELETE_CART_ITEM = 'DELETE_CART_ITEM';

export const setShoppingCart = (shoppingCart) => {
  return {
    type: SET_SHOPPING_CART,
    shoppingCart,
  };
};

export const deleteCartItem = (shoppingCart) => {
  return {
    type: DELETE_CART_ITEM,
    shoppingCart,
  };
};

//Thunk Creators
export const fetchShoppingCart = (cartId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/cart/${cartId}`);
      dispatch(setShoppingCart(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeFromCart = (cartId, cartItemId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/cart`, {
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

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SHOPPING_CART:
      return action.shoppingCart;
    case DELETE_CART_ITEM:
      return action.shoppingCart;
    default:
      return state;
  }
};