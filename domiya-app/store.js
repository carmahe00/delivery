import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
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
import { historyReducer } from "./src/reducer/historyReducer";
import { balanceReducer } from "./src/reducer/balanceReducer";
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: [API_USER],
  stateReconciler: hardSet,
};
const rootReducer = combineReducers({
  userReducer: persistReducer(persistConfig, userLoginReducer),
  userConnect: userConnectReducer,
  pedidosConnect: pedidosReducer,
  modalContent: modalReducer,
  message: messageReducer,
  history: historyReducer,
  balance: balanceReducer,
});
export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
