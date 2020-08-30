import { UPDATE_CART, CHANGE_CURRENCY, RESET_DATA } from './types';

const initialState = {
  data: {
    productQuantity: 0,
    totalPrice: 0,
  },
  currency: 'USD',
};

const totalReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CART:
      return {
        ...state,
        data: action.payload
      };
    case CHANGE_CURRENCY:
      return {
        ...state,
        currency: action.payload
      };
    case RESET_DATA:
      return {
        ...state,
        data: initialState.data
      };
    default:
      return state;
  }
}

export default totalReducer
