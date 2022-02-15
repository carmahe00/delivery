import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, combineReducers, createStore } from "redux";
import { userLoginReducer, userReducer } from "./reducer/userReducer";
import { cityCreateReducer, cityDeleteReducer, cityListReducer, cityUpdateReducer } from "./reducer/cityReducer";
import { userConnectReducer } from "./reducer/socketReducer";
import { modalSolicitudReducer } from "./reducer/modalReducer";

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}

const reducer = combineReducers({

    userLogin: userLoginReducer,
    userCrud: userReducer,

    cityList: cityListReducer,
    cityCreate: cityCreateReducer,
    cityUpdate: cityUpdateReducer,
    cityDelete: cityDeleteReducer,

    userConnect: userConnectReducer,
    modalSolicitud: modalSolicitudReducer
    
})

const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))
export default store
