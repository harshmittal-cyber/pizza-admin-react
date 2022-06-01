import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    CLEAR_ERRORS,
    LOGOUT_SUCCESS,
    RESET,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS
} from '../constants/userConstants'

import axios from 'axios';
import { API } from '../../Backend'
import { persistor } from '../store'

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
        localStorage.setItem("token", data.token);
        dispatch({ type: LOGIN_SUCCESS, payload: data });
        return data
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
        return error.response.data;
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

        localStorage.setItem("token", data.token)
        dispatch({ type: REGISTER_USER_SUCCESS, payload: data });

        return data
    } catch (error) {
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message });
        return error.response.data
    }
}

export const logout = () => async (dispatch) => {
    localStorage.clear();
    await persistor.purge();
    dispatch({ type: RESET })
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

export const forgotpassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST })

        const authAxios = axios.create({
            baseURL: API,
            headers: {
                "Content-type": 'application/json',
            },
            withCredentials: true
        });

        const { data } = await authAxios.post(
            `/api/admin/forgot`,
            { email },
        );

        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data });
        return data

    } catch (error) {
        dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message })
        return error.response.data

    }
}

export const resetPassword = (token, password) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST })

        const authAxios = axios.create({
            baseURL: API,
            headers: {
                "Content-type": 'application/json',
            },
            withCredentials: true
        });

        const { data } = await authAxios.put(`/api/admin/password/reset/${token}`, { password })
        localStorage.setItem("token", data.token)
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data })
        return data


    } catch (error) {
        dispatch({ type: RESET_PASSWORD_FAIL, payload: error.response.data.message })
        return error.response.data
    }
}

export const clearerror = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}