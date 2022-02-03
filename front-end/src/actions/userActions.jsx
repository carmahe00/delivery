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


export const logout = () => {
    return (dispatch) => {
        localStorage.removeItem('userInfo')
        dispatch({ type: types.userLogout })
    }
}