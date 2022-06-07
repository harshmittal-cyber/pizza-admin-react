import {
    GET_ORDERS_FAIL,
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS
} from '../constants/orderConstants';
import axios from 'axios';
import { API } from '../../Backend';

export const getOrders = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ORDERS_REQUEST });

        const token = localStorage.getItem("token")
        const authAxios = axios.create({
            baseURL: API,
            headers: {
                "Content-type": 'application/json',
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        });

        const { data } = await authAxios.get(`/api/order/admin/getorders`);
        console.log(data)
        dispatch({ type: GET_ORDERS_SUCCESS, payload: data });

    } catch (err) {
        dispatch({ type: GET_ORDERS_FAIL, payload: err.response.data.message });
        return err.response.data
    }
}

export const updateOrder = (orderId, orderStatus) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ORDER_REQUEST })

        const token = localStorage.getItem("token")

        const authAxios = axios.create({
            baseURL: API,
            headers: {
                "Content-type": 'application/json',
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        });

        const { data } = await authAxios.put(`/api/order/admin/updateOrder/${orderId}`, { type: orderStatus });
        console.log('data', data)
        dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data });
        return data

    } catch (err) {
        dispatch({ type: UPDATE_ORDER_FAIL, payload: err.response.data.message })
        return err.response.data
    }
}