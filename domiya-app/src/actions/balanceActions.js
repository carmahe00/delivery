import axios from "axios";
import { API_URL } from "@env";
import types from "../types/balanceType";

export const getBalance = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.valorRequest,
      });

      const {
        userReducer: { userInfo },
      } = getState();

      const { data } =
        userInfo.usuario &&
        (await axios.get(`${API_URL}/sueldos/${userInfo.usuario.uuid}`, {
          headers: {
            Authorization: `${userInfo.token}`,
          },
        }));
      dispatch({
        type: types.valorSuccess,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: types.valorError,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
