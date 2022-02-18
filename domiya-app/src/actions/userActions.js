import axios from 'axios'
import { API_URL, API_USER } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'

import types from '../types/userTypes'

export const login = (email, password) => {
    return async (dispatch) => {
        try {
            

            const { data } = await axios.post(`${API_URL}/users/login`, { email, password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(data)
            dispatch({
                type: types.userLoginSuccess,
                payload: data
            })
            await AsyncStorage.setItem(API_USER, JSON.stringify(data))
        } catch (error) {

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