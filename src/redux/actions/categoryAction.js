import {
    CATEGORY_CREATE_FAIL,
    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS
} from '../constants/categoryConstants';
import { API } from '../../Backend'

export const createcategory = ({ storeId, name }) => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_CREATE_REQUEST })

        const authAxios = axios.create({
            baseURL: API,
            headers: {
                "Content-type": 'application/json',
            },
            withCredentials: true
        });

        const { data } = await authAxios.post(
            `/api/category/create/${storeId}`,
            name,
        );
        console.log(data)
        dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CATEGORY_CREATE_FAIL, payload: error.response.data.message })
    }
}