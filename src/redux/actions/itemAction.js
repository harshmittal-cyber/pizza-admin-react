import axios from 'axios';
import { API } from '../../Backend';
import {
    ITEM_CREATE_FAIL,
    ITEM_CREATE_REQUEST,
    ITEM_CREATE_SUCCESS
} from '../constants/categoryConstants';


export const createItem = (storeId) => async (dispatch) => {
    try {
        dispatch({ type: ITEM_CREATE_REQUEST })

        const authAxios = axios.create({
            baseURL: API,
            headers: {
                "Content-type": 'application/json',
            },
            withCredentials: true
        });

        const { data } = await authAxios.post(`${API}/api/item/create/${storeId}`)

        dispatch({ type: ITEM_CREATE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ITEM_CREATE_FAIL, payload: error.response.data.message })
    }
}