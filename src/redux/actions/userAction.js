import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    CLEAR_ERRORS,
    LOGOUT_SUCCESS
} from '../constants/userConstants'

import axios from 'axios';
import { API } from '../../Backend'

export const login = (user) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        console.log('user', user)
        const authAxios = axios.create({
            baseURL: API,
            headers: {
                "Content-type": 'application/json',
            },
            withCredentials: true
        });

        const { data } = await authAxios.post(
            `/api/admin/login`,
            user,
        );
        console.log(data)
        dispatch({ type: LOGIN_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
};

export const register = (user) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        console.log('user', user)
        const authAxios = axios.create({
            baseURL: API,
            headers: {
                "Content-type": 'application/json',
            },
            withCredentials: true
        });

        const { data } = await authAxios.post(
            `/api/admin/signup`,
            user,
        );
        console.log(data)
        dispatch({ type: REGISTER_USER_SUCCESS, payload: data });


    } catch (error) {
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message })
    }
}

export const logout = () => async (dispatch) => {
    const authAxios = axios.create({
        baseURL: API,
        headers: {
            "Content-type": 'application/json',
        },
        withCredentials: true
    });

    await authAxios.get(`/api/admin/logout`);

    dispatch({ type: LOGOUT_SUCCESS })
}

export const clearerror = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}