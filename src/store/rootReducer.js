import { combineReducers } from 'redux';
import userReducer from './Auth/userReducer'
import cartReducer from './Cart/cartReducer'
import totalReducer from './total/totalReducer'

export default combineReducers({
    user: userReducer,
    cart: cartReducer,
    total: totalReducer
});
