import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, combineReducers, createStore } from "redux";
import { userLoginReducer } from "./reducer/userReducer";
import { cityCreateReducer, cityDeleteReducer, cityListReducer, cityUpdateReducer } from "./reducer/cityReducer";

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}

const reducer = combineReducers({

    userLogin: userLoginReducer,
    
    cityList: cityListReducer,
    cityCreate: cityCreateReducer,
    cityUpdate: cityUpdateReducer,
    cityDelete: cityDeleteReducer,
    
})

const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))
export default store
