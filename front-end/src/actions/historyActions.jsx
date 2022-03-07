import axios from "axios";
import types from "../types/historyType";

const baseUrl = process.env.REACT_APP_API_URL;
export const listHistories = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.historyListRequest,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const { data } = await axios.get(`${baseUrl}/pedidos`, {
        headers: {
          Authorization: `${userInfo.token}`,
        },
      });

      dispatch({
        type: types.historyListSuccess,
        payload: data,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: types.historyListFail,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
