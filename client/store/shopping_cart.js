import axios from 'axios';
import history from '../history';

const TOKEN = 'token';

//weird bc we're not getting all carts just want one cart and its items
const SET_SHOPPING_CART = 'SET_SHOPPING_CART'; 
const UPDATE_CART = 'UPDATE_CART';

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

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SHOPPING_CART:
      return action.cart;
    case UPDATE_CART:
      return action.cart
    default:
      return state;
  }
};


// put this here incase we want to add a cart, have to figure out where to put it though bc we need state to be an array not object like above.

// const ADD_CART = 'ADD_CART';

//export const _addCart = (cart) => {
//   return {
//     type: ADD_CART,
//     cart,
//   };
// };

// export const addCart = (cart) => {
//   return async (dispatch) => {
//     try {
//       const token = window.localStorage.getItem(TOKEN);
//       const { data: created } = await axios.post('/api/cart', cart, {
//         headers: {
//           authorization: token,
//         },
//       });
//       dispatch(_addCart(created));
//     } catch (error) {
//       console.error('theres something wrong with your add cart thunk');
//       console.log(error);
//     }
//   };
// };

// case ADD_CART:
//   return {...state, action.cart };
