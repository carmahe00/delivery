import axios from 'axios'
import types from '../types/userTypes'

const baseUrl = process.env.REACT_APP_API_URL

export const login = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: types.userLoginRequest
            })

            const { data } = await axios.post(`${baseUrl}/users/login`, { email, password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            dispatch({
                type: types.userLoginSuccess,
                payload: data
            })

            localStorage.setItem('userInfo', JSON.stringify(data))
        } catch (error) {
            console.log(error.response)
            switch (error.response.status) {
                case 400:
                    dispatch({
                        type: types.userLoginFail,
                        payload: 'Usuario o contraseña incorrecta'

                    })
                    break;

                default:
                    dispatch({
                        type: types.userLoginFail,
                        payload: 'Ocurrió un error de comunicación'

                    })
                    break;
            }
        }
    }
}

export const users = (type = null) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: types.userListRequest
            })
            const { userLogin: { userInfo } } = getState()
            console.log(type)
            const { data } = await axios.get(`${baseUrl}/users/`, {
                params:{
                    ...(type ? {type: type}: {})
                },
                headers: {
                    'Authorization': `${userInfo.token}`
                },
                
            })
            console.log(data)
            dispatch({
                type: types.userListSuccess,
                payload: data
            })
        } catch (error) {
            console.log(error.response)
            dispatch({
                type: types.userListFail,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}

export const addUser = (dataForm) => {
    return async (dispatch, getState) => {
        try {
            console.log(dataForm)
            dispatch({
                type: types.userCreateRequest
            })
            const { userLogin: { userInfo } } = getState()
            const { data } = await axios.post(`${baseUrl}/users/`, dataForm, {
                headers: {
                    'Authorization': `${userInfo.token}`
                }
            })
            console.log("new Data:", data)
            dispatch({
                type: types.userCreateSuccess,
                payload: data
            })
        } catch (error) {
            console.log(error.response)
            dispatch({
                type: types.userCreateFail,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}

export const updateUser = (dataForm) => {
    return async (dispatch, getState) => {
        try {
            
            dispatch({
                type: types.userUpdateRequest
            })
            const { userLogin: { userInfo } } = getState()
            const { data } = await axios.put(`${baseUrl}/users/${dataForm.uuid}`, dataForm, {
                headers: {
                    'Authorization': `${userInfo.token}`
                }
            })
            console.log("update Data:", data)
            dispatch({
                type: types.userUpdateSuccess,
                payload: data
            })
        } catch (error) {
            console.log(error.response)
            dispatch({
                type: types.userUpdateFail,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}

export const deleteUser = ({uuid}) => {
    return async (dispatch, getState) => {
        try {
            
            dispatch({
                type: types.userDeleteRequest
            })
            const { userLogin: { userInfo } } = getState()
            const { data } = await axios.delete(`${baseUrl}/users/${uuid}`, {
                headers: {
                    'Authorization': `${userInfo.token}`
                }
            })
            console.log("update Data:", data)
            dispatch({
                type: types.userDeleteSuccess,
                payload: uuid
            })
        } catch (error) {
            console.log(error.response)
            dispatch({
                type: types.userDeleteFail,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            })
        }
    }
}

export const logout = () => {
    return (dispatch) => {
        localStorage.removeItem('userInfo')
        dispatch({ type: types.userLogout })
    }
}