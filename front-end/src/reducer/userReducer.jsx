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

export const userReducer = (state = { loading: false, users: [] }, action) => {
    switch (action.type) {
        case types.userListRequest:
            return { ...state, loading: true }
        case types.userListSuccess:
            return { ...state, loading: false, users: action.payload }
        case types.userListFail:
            return { ...state, loading: false, error: action.payload }
        case types.userListReset:
            return { users: [] }
        case types.userCreateRequest:
            return { ...state, loadingCreate: true }
        case types.userCreateSuccess:
            return { ...state, loadingCreate: false, users: [...state.users, action.payload] }
        case types.userCreateFail:
            return { ...state, loadingCreate: false, errorCreate: action.payload }
        case types.userUpdateRequest:
            return { ...state, loadingUpdate: true }
        case types.userUpdateSuccess:
            const user = action.payload
            const existUser = state.users.find(u => u.uuid === user.uuid)
            if (existUser)
                return {
                    ...state,
                    users: state.users.map(u => 
                        (u.uuid === existUser.uuid) ? user : u
                    )
                }
            return { ...state }
        case types.userUpdateFail: 
            return { ...state, loadingUpdate: false, errorUpdate: action.payload }
        case types.userDeleteRequest: 
            return {...state, loadingDelete: true}
        case types.userDeleteSuccess:
            return { ...state, loadingDelete: false ,users: state.users.filter(u => u.uuid !== action.payload) }
        case types.userDeleteFail: 
            return { ...state, loadingDelete: false, errorDelete: action.payload }
        default:
            return state;
    }
}
