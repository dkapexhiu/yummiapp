import { LOAD_CART, ADD_PRODUCT, RESET_PRODUCTS, REMOVE_PRODUCT, CHANGE_PRODUCT_QUANTITY } from './types';

export const loadCart = products => ({
  type: LOAD_CART,
  payload: products
});

export const addProduct = product => ({
  type: ADD_PRODUCT,
  payload: product
});

export const resetProducts = () => ({
  type: RESET_PRODUCTS
});

export const removeProduct = product => ({
  type: REMOVE_PRODUCT,
  payload: product
});

export const changeProductQuantity = product => ({
  type: CHANGE_PRODUCT_QUANTITY,
  payload: product
});