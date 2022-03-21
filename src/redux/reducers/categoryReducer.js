import {
    CATEGORY_CREATE_FAIL,
    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS
} from '../constants/categoryConstants'

const initialState = {
    loading: false,
    categories: [],
    isDeleted: false,
    error: null,
    success: false
}


export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORY_CREATE_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case CATEGORY_CREATE_SUCCESS:
            return {
                ...state,
                categories: [...state.categories, action.payload.category],
                loading: false,
                success: true
            }

        case CATEGORY_CREATE_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state
    }
}