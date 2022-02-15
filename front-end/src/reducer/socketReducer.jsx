import types from "../types/socketType"

export const userConnectReducer = (state = { connect: false, pedidos: [] }, action) => {
    switch (action.type) {
        case types.userConnect:
            return { ...state, connect: true }
        case types.userDisconnet:
            return { ...state, connect: false }
        default:
            return state
    }
}