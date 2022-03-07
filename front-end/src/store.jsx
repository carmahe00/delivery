import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { userLoginReducer, userReducer } from "./reducer/userReducer";
import {
  cityCreateReducer,
  cityDeleteReducer,
  cityListReducer,
  cityUpdateReducer,
} from "./reducer/cityReducer";
import { pedidosReducer, userConnectReducer } from "./reducer/socketReducer";
import { modalSolicitudReducer } from "./reducer/modalReducer";
import { historyListReducer } from "./reducer/historyReducer";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userCrud: userReducer,

  cityList: cityListReducer,
  cityCreate: cityCreateReducer,
  cityUpdate: cityUpdateReducer,
  cityDelete: cityDeleteReducer,

  userConnect: userConnectReducer,
  pedidosConnect: pedidosReducer,
  modalSolicitud: modalSolicitudReducer,

  historyList: historyListReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
