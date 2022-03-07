import axios from "axios";
import { API_URL, API_USER } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

import types from "../types/userTypes";
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

      dispatch({
        type: types.userLoginSuccess,
        payload: data,
      });
      await AsyncStorage.setItem(API_USER, JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: types.userLoginFail,
        payload: "Error al iniciar sesión",
      });
      dispatch(openMessage(error))
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      console.log("Aca");
      await AsyncStorage.removeItem(API_USER);
      dispatch({
        type: types.userLogout,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
