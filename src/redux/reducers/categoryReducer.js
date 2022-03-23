import {
    CATEGORY_CREATE_FAIL,
    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    ITEM_CREATE_FAIL,
    ITEM_CREATE_REQUEST,
    ITEM_CREATE_SUCCESS,
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    DELETE_ITEM_FAIL,
    DELETE_ITEM_REQUEST,
    DELETE_ITEM_SUCCESS,
    UPDATE_ITEM_REQUEST,
    UPDATE_ITEM_FAIL,
    UPDATE_ITEM_SUCCESS
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
        case ITEM_CREATE_REQUEST:
        case GET_CATEGORIES_REQUEST:
        case DELETE_ITEM_REQUEST:
        case UPDATE_ITEM_REQUEST:
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

        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload,
                loading: false
            }

        case ITEM_CREATE_SUCCESS:
            return {
                ...state,
                categories: state.categories.map((cate) => {
                    if (cate._id === action.payload.categoryId) {
                        return {
                            ...cate,
                            items: [...cate.items, action.payload]
                        }
                    }
                    return cate
                }),
                loading: false,
                success: true,
                error: null
            }

        case DELETE_ITEM_SUCCESS:
            return {
                ...state,
                categories: state.categories.map((cate) => {
                    return {
                        ...cate,
                        items: cate.items.filter((i) => i._id !== action.payload._id)
                    }
                }),
                loading: false,
                success: true,
                error: null
            }

        case UPDATE_ITEM_SUCCESS:
            return {
                ...state,
                categories: state.categories.map((cate) => {
                    if (cate._id === action.payload.item.categoryId) {
                        return {
                            ...cate,
                            items: cate.items.map((i) => i._id !== action.payload.item._id ? i : action.payload.item)
                        }
                    }
                    return cate
                }),
                loading: false,
                error: null,
                success: true
            }

        case CATEGORY_CREATE_FAIL:
        case ITEM_CREATE_FAIL:
        case GET_CATEGORIES_FAIL:
        case DELETE_ITEM_FAIL:
        case UPDATE_ITEM_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state
    }
}