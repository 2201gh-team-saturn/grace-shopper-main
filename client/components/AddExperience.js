export const deleteCartItemThunk = (id, history) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    const { data: cartItem } = await axios.delete(`/api/cart`, id, {
      headers: {
        authorization: token,
      },
    });
    dispatch(_deleteCartItem(cartItem));
    history.push('/');
  };
};
