import types from '../types/userTypes'

export const userLoginReducer = (state = { loading: false, userInfo: {} }, action) => {
    switch (action.type) {
        case types.userLoginRequest:
            return { loading: true }
        case types.userLoginSuccess:
            return { loading: false, userInfo: action.payload }
        case types.userLoginFail:
            return { loading: false, error: action.payload }
        case types.userRenewToken:
            return { ...state, userInfo: action.payload, loading: false }
        case types.userLogout:
            return {}
        default:
            return state
    }
}