import types from "../types/userTypes";

export const userLoginReducer = (
  state = { loading: false, userInfo: {} },
  action
) => {
  switch (action.type) {
    case types.userLoginRequest:
      return { loading: true };
    case types.userLoginSuccess:
      return { loading: false, userInfo: action.payload };
    case types.userLoginFail:
      return { loading: false, error: action.payload };
    case types.userRenewToken:
      return { ...state, userInfo: action.payload, loading: false };
    case types.userPasswordRequest:
      return { ...state, loading: true };
    case types.userPasswordSuccess:
      return { ...state, loading: false, change: true };
    case types.userPasswordFail:
      return { ...state, loading: false, change: false };
    case types.userValorRequest:
      return { ...state, loadingBalance: true };
    case types.userValorSuccess:
      return { ...state, loadingBalance: false, valor: action.payload };
    case types.userValorFail:
      return { ...state, loadingBalance: false, errorBalance: action.payload };
    case types.userValorReset:
      return { ...state, loadingBalance: false, valor: {} };
    case types.userLogout:
      return {};
    default:
      return state;
  }
};

export const userReducer = (state = { loading: false, users: [] }, action) => {
  switch (action.type) {
    case types.userListRequest:
      return { ...state, loading: true };
    case types.userListSuccess:
      return { ...state, loading: false, users: action.payload };
    case types.userListFail:
      return { ...state, loading: false, error: action.payload };
    case types.userListReset:
      return { users: [] };
    case types.userCreateRequest:
      return { ...state, loadingCreate: true };
    case types.userCreateSuccess:
      return {
        ...state,
        loadingCreate: false,
        users: [action.payload, ...state.users],
      };
    case types.userCreateFail:
      return { ...state, loadingCreate: false, errorCreate: action.payload };
    case types.userUpdateRequest:
      return { ...state, loadingUpdate: true };
    case types.userUpdateSuccess:
      const user = action.payload;
      const existUser = state.users.find((u) => u.uuid === user.uuid);
      if (existUser)
        return {
          ...state,
          loadingUpdate: false,
          users: state.users.map((u) => (u.uuid === existUser.uuid ? user : u)),
        };
      return { ...state };
    case types.userUpdateFail:
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };
    case types.userDeleteRequest:
      return { ...state, loadingDelete: true };
    case types.userDeleteSuccess:
      return {
        ...state,
        loadingDelete: false,
        users: state.users.filter((u) => u.uuid !== action.payload),
      };
    case types.userDeleteFail:
      return { ...state, loadingDelete: false, errorDelete: action.payload };
    default:
      return state;
  }
};
