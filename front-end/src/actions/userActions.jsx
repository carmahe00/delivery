import axios from "axios";
import Swal from "sweetalert2";
import types from "../types/userTypes";

const baseUrl = process.env.REACT_APP_API_URL;

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.userLoginRequest,
      });

      const { data } = await axios.post(
        `${baseUrl}/users/login`,
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

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      console.log(error.response);
      Swal.fire("Error!", "Usuario o contraseña incorrecta!", "error");
      switch (error.response.status) {
        case 400:
          dispatch({
            type: types.userLoginFail,
            payload: "Usuario o contraseña incorrecta",
          });
          break;

        default:
          dispatch({
            type: types.userLoginFail,
            payload: "Ocurrió un error de comunicación",
          });
          break;
      }
    }
  };
};

export const users = (type = null) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.userListRequest,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const { data } = await axios.get(`${baseUrl}/users/`, {
        params: {
          ...(type ? { type: type } : {}),
        },
        headers: {
          Authorization: `${userInfo.token}`,
        },
      });
      dispatch({
        type: types.userListSuccess,
        payload: data,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: types.userListFail,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const usersCharge = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.userListRequest,
      });
      const {
        userLogin: { userInfo },
      } = getState();

      const { data } = await axios.get(`${baseUrl}/users/charge-users`, {
        headers: {
          Authorization: `${userInfo.token}`,
        },
      });
      console.log(data);
      dispatch({
        type: types.userListSuccess,
        payload: data,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: types.userListFail,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const addUser = (dataForm) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.userCreateRequest,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const { data } = await axios.post(`${baseUrl}/users/`, dataForm, {
        headers: {
          Authorization: `${userInfo.token}`,
        },
      });
      console.log("new Data:", data);
      dispatch({
        type: types.userCreateSuccess,
        payload: data,
      });
      Swal.fire("Exito!", "Usuario guardado con exito!", "success");
    } catch (error) {
      Swal.fire("Error!", "Usuario no se guardo!", "error");
      console.log(error.response);
      dispatch({
        type: types.userCreateFail,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const updateUser = (dataForm) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.userUpdateRequest,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const { data } = await axios.put(
        `${baseUrl}/users/${dataForm.uuid}`,
        dataForm,
        {
          headers: {
            Authorization: `${userInfo.token}`,
          },
        }
      );
      dispatch({
        type: types.userUpdateSuccess,
        payload: data,
      });
      Swal.fire("Exito!", "Usuario actualizado con exito!", "success");
    } catch (error) {
      Swal.fire("Error!", "Usuario no se actualizo!", "error");
      console.log(error.response);
      dispatch({
        type: types.userUpdateFail,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const balanceUser = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.userValorRequest,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const { data } = await axios.get(
        `${baseUrl}/sueldos/${userInfo.usuario.uuid}`,
        {
          headers: {
            Authorization: `${userInfo.token}`,
          },
        }
      );
      console.log(data);
      dispatch({
        type: types.userValorSuccess,
        payload: data,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: types.userValorFail,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const changePassword = (dataForm) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.userPasswordRequest,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      await axios.post(`${baseUrl}/users/password`, dataForm, {
        headers: {
          Authorization: `${userInfo.token}`,
        },
      });
      Swal.fire("EXITO!", "Su contraseña ha sido cambiada!", "success");
      dispatch({
        type: types.userPasswordSuccess,
        payload: "Contraseña Actualizada",
      });
    } catch (error) {
      console.log(error.response);
      Swal.fire("Error!", "Contraseña incorrecta!", "error");
      dispatch({
        type: types.userPasswordFail,
        payload: "Usuario o contraseña incorrecta",
      });
    }
  };
};

export const uploadImage = (e, { uuid }) => {
  return async (dispatch, getState) => {
    try {
      if (e.current !== null) {
        dispatch({
          type: types.userUpdateRequest,
        });
        const file = e.current.files[0];
        const formData = new FormData();
        formData.append("image", file);
        const {
          userLogin: { userInfo },
        } = getState();
        const { data } = await axios.post(
          `${baseUrl}/uploads/users/${uuid}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `${userInfo.token}`,
            },
          }
        );
        console.log("update Image:", data);
        dispatch({
          type: types.userUpdateSuccess,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: types.userUpdateFail,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: types.userLogout });
  };
};
