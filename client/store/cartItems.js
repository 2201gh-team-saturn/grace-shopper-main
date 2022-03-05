import axios from 'axios'

const SET_ROOMS= 'SET_ROOMS';
const ADD_ROOM = 'ADD_ROOM';
const DELETE_CART_ITEM = 'DELETE_CART_ITEM';
const UPDATE_ROOM = 'UPDATE_EXPERIENCE';


// export const deleteCartItem = (cartItem) => {
//     return {
//       type: DELETE_CART_ITEM,
//       room
//     }
//   };

//   const _updateRoom = (newRoom) => {
//     return { type: UPDATE_ROOM, updatedRoom: newRoom };
//   };


// export const deleteCartItem = (cartId, cartItemId, history) => {
//     return async (dispatch) => {
//       try {
//         const { data: deleted} = await axios.delete(`/api/carts/${cartId}`);
//         dispatch(deleteRoom(deleted));
//         history.push('/');
//       } catch (error) {
//         console.log(error);
//       }
//     };
//   };

//   export const updateRoom = (id, roomToUpdate, history) => {
//     return async (dispatch) => {
//       const response = await axios.put(`/api/experiences/${id}`, roomToUpdate);
//       const updatedRoom = response.data;
//       dispatch(_updateRoom(updatedRoom));
//       history.push('/');
//     };
//   };
