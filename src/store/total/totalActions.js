import { UPDATE_CART, CHANGE_CURRENCY, RESET_DATA } from './types';

export const updateCart = cartProducts => dispatch => {
  let productQuantity = cartProducts.reduce((sum, p) => {
    sum += parseInt(p.quantity);
    return sum;
  }, 0);

  let totalPrice = cartProducts.reduce((sum, p) => {
    //console.log(p);
    sum += p.price * parseInt(p.quantity) + p.base;
    return sum;
  }, 0);

  totalPrice += 2; // shipping cost

  let cartTotal = {
    productQuantity,
    totalPrice,
  };

  dispatch({
    type: UPDATE_CART,
    payload: cartTotal
  });
};

export const changeCurrency = curr => ({
  type: CHANGE_CURRENCY,
  payload: curr
});
export const resetData = () => ({
  type: RESET_DATA
});