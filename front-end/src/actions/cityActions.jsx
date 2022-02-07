import axios from "axios"
import types from '../types/cityType';

const baseUrl = process.env.REACT_APP_API_URL
export const listCities = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: types.cityListRequest
            })

            const { userLogin: { userInfo } } = getState()

            const { data } = await axios.get(`${baseUrl}/cities/`, {
                headers: {

                    'Authorization': `${userInfo.token}`
                }
            })

            dispatch({
                type: types.cityListSuccess,
                payload: data
            })


        } catch (error) {
            console.log(error.response)
            dispatch({
                type: types.cityListFail,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message

            })
        }
    }
}

export const createCities = (dataCity) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: types.cityCreateRequest
            })
            const { userLogin: { userInfo } } = getState()
            const { data } = await axios.post(`${baseUrl}/cities/`, dataCity, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${userInfo.token}`
                }
            })
            console.log(data)
            dispatch({
                type: types.cityCreateSuccess,
                payload: data
            })
            dispatch(listCities())
        } catch (error) {
            console.log(error.response)
            dispatch({
                type: types.cityCreateFail,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message

            })
        }
    }
}


export const updateCities = ({ nombre, id_ciudad }) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: types.cityUpdateRequest
            })
            const { userLogin: { userInfo } } = getState()
            const { data } = await axios.put(`${baseUrl}/cities/${id_ciudad}`, { nombre }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${userInfo.token}`
                }
            })
            console.log(data)
            dispatch({
                type: types.cityUpdateSuccess,
                payload: data
            })
            dispatch(listCities())
        } catch (error) {
            console.log(error.response)
            dispatch({
                type: types.cityUpdateFail,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message

            })
        }
    }
}


export const deleteCities = ({ id_ciudad }) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: types.cityDeleteRequest
            })
            const { userLogin: { userInfo } } = getState()
            await axios.delete(`${baseUrl}/cities/${id_ciudad}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${userInfo.token}`
                }
            })

            dispatch({
                type: types.cityDeleteSuccess,
                
            })
            dispatch(listCities())
        } catch (error) {
            console.log(error.response)
            dispatch({
                type: types.cityCreateFail,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message

            })
        }
    }
}