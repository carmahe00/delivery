import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension"; // this is for debugging with React-Native-Debugger, you may leave it out
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { API_USER } from "@env";
import { modalReducer } from "./src/reducer/modalReducer";
import { userLoginReducer } from "./src/reducer/userReducer";
import {
  pedidosReducer,
  userConnectReducer,
} from "./src/reducer/socketReducer";
import { messageReducer } from "./src/reducer/messageReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: [API_USER],
};

const rootReducer = combineReducers({
  userReducer: persistReducer(persistConfig, userLoginReducer),

  userConnect: userConnectReducer,
  pedidosConnect: pedidosReducer,
  modalContent: modalReducer,

  message: messageReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
