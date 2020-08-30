import { SET_USER, CLEAR_USER, SET_MESSAGE } from './types'

const initialUserState = {
    currentUser: null,
    isLoading: true,
    message: ''
}

const userReducer = (state = initialUserState, action) => {

    switch (action.type) {

        case SET_USER:
            return {
                ...state,
                currentUser: action.payload.currentUser,
                isLoading: false
            }
        case CLEAR_USER:
            return {
                ...state,
                currentUser: null,
                isLoading: false
            }

        case SET_MESSAGE:
            return {
                ...state,
                message: action.payload
            };
        default:
            return state
    }
}


export default userReducer