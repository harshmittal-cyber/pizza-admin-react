import {
    GET_ORDERS_FAIL,
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS
} from '../constants/orderConstants';

const initialState = {
    loading: false,
    error: null,
    message: null,
    orders: [],
    success: true
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDERS_REQUEST:
        case UPDATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }

        case GET_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload.orders,
                error: null,
                success: true,
                message: action.payload.message
            }

        case UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                message: action.payload.message,
                error: null,
                orders: state.orders.map(order => {
                    if (order._id === action.payload.order._id) {
                        return {
                            ...order,
                            orderStatus: action.payload.order.orderStatus
                        }
                    }
                    return order
                })
            }

        case GET_ORDERS_FAIL:
        case UPDATE_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload
            }

        default:
            return state
    }
}