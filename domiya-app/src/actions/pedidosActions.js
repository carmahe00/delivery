import types from "../types/socketType";
import { API_URL } from "@env";
import axios from "axios";

export const pedidosRecive = (data, tipo_vehiculo, tipousuario) => ({
  type: types.pedidosRecive,
  payload: data,
  tipo_vehiculo,
  tipousuario
});
export const pedidoRecive = (data) => ({
  type: types.pedidoRecive,
  payload: data,
});
export const pedidoReset = () => ({ type: types.pedidoReset });

export const detailPedido = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.pedidoRequest,
      });

      const {
        userReducer: { userInfo },
      } = getState();
      const { data } = await axios.get(`${API_URL}/pedidos/${id}`, {
        headers: {
          Authorization: `${userInfo.token}`,
        },
      });

      dispatch({
        type: types.pedidoRecive,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: types.pedidoError,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};



