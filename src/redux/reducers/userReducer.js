import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    CLEAR_ERRORS,
    LOGOUT_SUCCESS
} from '../constants/userConstants';


const initialState = {
    loading: false,
    user: null,
    isAuthenticated: false,
    error: null
}


export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false
            }

        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                user: action.payload.store,
                isAuthenticated: action.payload.success,
                loading: false,
                error: null
            }

        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
            return {
                ...state,
                user: null,
                error: action.payload,
                loading: false
            }

        case LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                user: null,
                isAuthenticated: false,
            };


        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}