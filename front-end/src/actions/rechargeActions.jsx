import axios from "axios"
import types from '../types/rechargeType';

const baseUrl = process.env.REACT_APP_API_URL
export const listCharges = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: types.rechargeListRequest
            })

            const { userLogin: { userInfo } } = getState()

            const { data } = await axios.get(`${baseUrl}/recargas/`, {
                headers: {
                    'Authorization': `${userInfo.token}`
                }
            })
            console.log(data);
            dispatch({
                type: types.rechargeListSuccess,
                payload: data
            })


        } catch (error) {
            console.log(error.response)
            dispatch({
                type: types.rechargeListFail,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}


export const createRecharge = (dataCharge) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: types.rechargeCreateRequest
            })
            const { userLogin: { userInfo } } = getState()
            const { data } = await axios.post(`${baseUrl}/recargas/`, dataCharge, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${userInfo.token}`
                }
            })
            
            dispatch({
                type: types.rechargeCreateSuccess,
                payload: data
            })
            dispatch(listCharges())
        } catch (error) {
            console.log(error.response)
            dispatch({
                type: types.rechargeCreateFail,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message

            })
        }
    }
}



export const updateRecharge = ({ id_recarga, ...props }) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: types.rechargeUpdateRequest
            })
            const { userLogin: { userInfo } } = getState()
            const { data } = await axios.put(`${baseUrl}/recargas/${id_recarga}`, props, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${userInfo.token}`
                }
            })
            
            dispatch({
                type: types.rechargeUpdateSuccess,
                payload: data
            })
            dispatch(listCharges())
        } catch (error) {
            console.log(error.response)
            dispatch({
                type: types.rechargeUpdateFail,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message

            })
        }
    }
}



export const deleteRecharge = ({ id_recarga }) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: types.rechargeDeleteRequest
            })
            const { userLogin: { userInfo } } = getState()
            await axios.delete(`${baseUrl}/recargas/${id_recarga}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${userInfo.token}`
                }
            })

            dispatch({
                type: types.rechargeDeleteSuccess,
                
            })
            dispatch(listCharges())
        } catch (error) {
            console.log(error.response)
            dispatch({
                type: types.rechargeCreateFail,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message

            })
        }
    }
}