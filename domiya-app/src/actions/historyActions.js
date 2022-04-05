import axios from 'axios'
import { API_URL } from "@env";
import types from '../types/historyTypes'

export const listPedidos = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.pedidoRequest,
      });
    
      const {
        userReducer: { userInfo },
      } = getState();
      
      const { data } = await axios.get(`${API_URL}/pedidos`, {
        headers: {
          Authorization: `${userInfo.token}`,
        },
      });
      
      dispatch({
        type: types.pedidoSuccess,
        payload: data,
      });
    } catch (error) {
      console.log(error)
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
