import types from "../types/historyType";

export const historyListReducer = (state = { histories: [] }, action) => {
  switch (action.type) {
    case types.historyListRequest:
      return { loading: true };
    case types.historyListSuccess:
      return { loading: false, histories: action.payload };
    case types.historyListFail:
      return { loading: false, error: action.payload };
    case types.historyListReset:
      return { histories: [] };
    default:
      return state;
  }
};
