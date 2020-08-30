import { LOAD_CART, ADD_PRODUCT, RESET_PRODUCTS, REMOVE_PRODUCT, CHANGE_PRODUCT_QUANTITY } from './types';

const initialState = {
    products: [],
    productToAdd: {}
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CART:
            return {
                ...state,
                products: action.payload
            };
        case RESET_PRODUCTS:
            return {
                ...state,
                products: []
            };
        case ADD_PRODUCT:
            return {
                ...state,
                productToAdd: Object.assign({}, action.payload)
            };
        case REMOVE_PRODUCT:
            return {
                ...state,
                productToRemove: Object.assign({}, action.payload)
            };
        case CHANGE_PRODUCT_QUANTITY:
            return {
                ...state,
                productToChange: Object.assign({}, action.payload)
            };
        default:
            return state;
    }
}

export default cartReducer