import {
    CATEGORY_CREATE_FAIL,
    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    DELETE_CATEGORY_FAIL,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    SET_SELECTED_CATEGORY
} from '../constants/categoryConstants';
import { API } from '../../Backend'
import axios from 'axios'

export const getCategories = (userId) => async (dispatch) => {
    try {
        dispatch({ type: GET_CATEGORIES_REQUEST })

        const token = localStorage.getItem("token")
        const authAxios = axios.create({
            baseURL: API,
            headers: {
                "Content-type": 'application/json',
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        });

        const { data } = await authAxios.get(
            `/api/category/get/${userId.userId}`);
        console.log(data)
        dispatch({ type: GET_CATEGORIES_SUCCESS, payload: data.categories })
    } catch (error) {
        dispatch({ type: GET_CATEGORIES_FAIL, payload: error.response.data.message })
    }
}
export const createCategory = (userId, name) => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_CREATE_REQUEST })

        const token = localStorage.getItem("token")
        const authAxios = axios.create({
            baseURL: API,
            headers: {
                "Content-type": 'application/json',
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        });

        const { data } = await authAxios.post(
            `/api/category/create/${userId}`,
            { name: name },
        );

        dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: data });
        return data
    } catch (error) {
        dispatch({ type: CATEGORY_CREATE_FAIL, payload: error.response.data.message })
        return error.response.data
    }
}

export const deleteCategory = (categoryId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_CATEGORY_REQUEST });

        const token = localStorage.getItem("token")
        const authAxios = axios.create({
            baseURL: API,
            headers: {
                "Content-type": 'application/json',
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        });

        const { data } = await authAxios.delete(
            `/api/category/delete/${categoryId}`
        );
        dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: data });
        return data

    } catch (error) {
        dispatch({ type: DELETE_CATEGORY_FAIL, payload: error.response.data.message });
        return error.response.data
    }
}

export const updateCategory = (userId, category) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CATEGORY_REQUEST })

        const token = localStorage.getItem("token")
        const authAxios = axios.create({
            baseURL: API,
            headers: {
                "Content-type": 'application/json',
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        });

        const { data } = await authAxios.put(
            `/api/category/update/${userId}/${category._id}`,
            category
        );
        dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: data });
        return data

    } catch (error) {
        dispatch({ type: UPDATE_CATEGORY_FAIL, payload: error.response.data.message })
    }
}

export const selectedCategory = (category) => async (dispatch) => {
    dispatch({ type: SET_SELECTED_CATEGORY, payload: category })
}