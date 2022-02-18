import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension' // this is for debugging with React-Native-Debugger, you may leave it out
import { userLoginReducer } from './src/reducer/userReducer'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { API_USER } from '@env'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [API_USER]
}

const rootReducer = combineReducers({
    userReducer: persistReducer(persistConfig, userLoginReducer)
})

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export const persistor = persistStore(store)