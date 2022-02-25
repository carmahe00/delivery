import types from "../types/modalType"

export const modalReducer = (state = { open: false }, action) => {
    switch (action.type) {
        case types.modalOpen:
            return { open: true, pedido: action.payload }
        case types.modalClose:
            return { open: false }
        default:
            return state
    }
}