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
      const { token, usuario } = data;
      let {
        routes,
        estado,
        fecha_creado,
        longitud,
        latitud,
        estadoborrado,
        valor_servicio,
        fecha_borrador,
        obligatorio,
        id_usuario,
        fecha_tecnomecanica,
        fecha_obligatorio,
        tecnomecanica,
        ...newUsuario
      } = usuario;
      delete newUsuario["ciudad.id_ciudad"];
      delete newUsuario["ciudad.nombre"];
      let userLowercase = {};
      for (var key in newUsuario) {
        var value =
          typeof newUsuario[key] === "string"
            ? String(newUsuario[key])
                .replace(/ /g, "")
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            : newUsuario[key];
        var key = String(key)
          .replace(/ /g, "")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        userLowercase[key] = value;
      }
      const newData = {
        token,
        usuario: {
          ...userLowercase,
        },
      };
      const device = await messaging().getToken();
      if (device) {
        dispatch({
          type: types.userLoginSuccess,
          payload: { ...newData, device },
        });
      } else {
        dispatch({
          type: types.userLoginSuccess,
          payload: { ...newData },
        });
      }

      await AsyncStorage.setItem(API_USER, JSON.stringify(newData));
    } catch (error) {
      console.log("error de login:", error);
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
      console.log("error de password:", error);
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
      console.log("error de logout:", error);
    }
  };
};
