import axios from "axios";
import { API_URL, API_USER, ORDER } from "@env";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";

import types from "../types/userTypes";
import typesPedidos from "../types/socketType";
import { openMessage } from "./messageActions";

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.userLoginRequest,
        payload: data,
      });
      const { data } = await axios.post(
        `${API_URL}/users/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const device = await messaging().getToken();
      if(device){
        dispatch({
          type: types.userLoginSuccess,
          payload: { ...data, device },
        });
      }else {
        dispatch({
          type: types.userLoginSuccess,
          payload: { ...data },
        });
      }
      
      await AsyncStorage.setItem(API_USER, JSON.stringify(data));
    } catch (error) {
      if (error.response)
        switch (error.response.status) {
          case 400:
            dispatch({
              type: types.userLoginFail,
              payload: "Usuario o contraseña incorrecta",
            });
            break;
          case 500:
            dispatch({
              type: types.userLoginFail,
              payload: "Error comunicación con el servidor",
            });
            break;
          default:
            dispatch({
              type: types.userLoginFail,
              payload: "Error al iniciar sesión",
            });
            break;
        }
      else
        dispatch({
          type: types.userLoginFail,
          payload: "Revise la conexión a internet",
        });
      dispatch(openMessage(error));
    }
  };
};

export const changePassword = (dataForm) => {
  return async (dispatch, getState) => {
    try {
      const {
        userReducer: { userInfo },
      } = getState();

      await axios.post(`${API_URL}/users/password`, dataForm, {
        headers: {
          Authorization: `${userInfo.token}`,
        },
      });

      Alert.alert(
        "EXITO!",
        "Contraseña actualizada",
        [
          {
            text: "Ok",
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.log(error);
      Alert.alert(
        "ERROR!",
        "No se pudo cambiar contraseña",
        [
          {
            text: "Ok",
          },
        ],
        { cancelable: false }
      );
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await AsyncStorage.removeItem(API_USER);
      await AsyncStorage.removeItem(ORDER);
      dispatch({
        type: typesPedidos.pedidosLogout,
      });
      dispatch({
        type: types.userLogout,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
