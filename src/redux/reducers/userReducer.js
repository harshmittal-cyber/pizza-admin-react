import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    CLEAR_ERRORS,
    LOGOUT_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS
} from '../constants/userConstants';


const initialState = {
    loading: false,
    user: null,
    isAuthenticated: false,
    error: null,
    message:null
}


export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false,
                message:null,
                error:null
            }

        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                user: action.payload.store,
                isAuthenticated: action.payload.success,
                loading: false,
                error: null,
            }
        
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading:false,
                message:action.payload.message,
                error:null
            }
        
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                user:action.payload.user,
                isAuthenticated:action.payload.success,
                loading:false,
                error:null,
                message:action.payload.message
            }

        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                user: null,
                error: action.payload,
                loading: false,
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