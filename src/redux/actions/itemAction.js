import axios from 'axios';
import { API } from '../../Backend';
import {
    ITEM_CREATE_FAIL,
    ITEM_CREATE_REQUEST,
    ITEM_CREATE_SUCCESS,
    DELETE_ITEM_FAIL,
    DELETE_ITEM_REQUEST,
    DELETE_ITEM_SUCCESS,
    UPDATE_ITEM_FAIL,
    UPDATE_ITEM_REQUEST,
    UPDATE_ITEM_SUCCESS
} from '../constants/categoryConstants';


export const createItem = (storeId, newItem) => async (dispatch) => {
    try {
        dispatch({ type: ITEM_CREATE_REQUEST })

        const authAxios = axios.create({
            baseURL: API,
            headers: {
                "Content-type": 'application/json',
            },
            withCredentials: true
        });

        const { data } = await authAxios.post(`${API}/api/item/create/${storeId}`, newItem)

        dispatch({ type: ITEM_CREATE_SUCCESS, payload: data.item });

        return data
    } catch (error) {
        dispatch({ type: ITEM_CREATE_FAIL, payload: error.response.data.message });
        return error.response.data
    }
}

export const deleteItem = (itemId) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_ITEM_REQUEST })

        const authAxios = axios.create({
            baseURL: API,
            headers: {
                "Content-type": 'application/json',
            },
            withCredentials: true
        });

        const { data } = await authAxios.delete(`/api/item/delete/${itemId}`);

        dispatch({ type: DELETE_ITEM_SUCCESS, payload: data })


    } catch (error) {
        dispatch({ type: DELETE_ITEM_FAIL, payload: error.response.data.message })
    }
}

export const updateItem = (userId,itemId) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ITEM_REQUEST })

        const authAxios = axios.create({
            baseURL: API,
            headers: {
                "Content-type": 'application/json',
            },
            withCredentials: true
        });

        const { data } = await authAxios.put(`/api/item/update/${itemId._id}`,itemId);

        dispatch({ type: UPDATE_ITEM_SUCCESS, payload: data });
        return data


    } catch (error) {
        dispatch({ type: UPDATE_ITEM_FAIL, payload: error.response.data.message })
        return error.response.data
    }
}