import types from "../types/messagesType"

export const messageReducer = (state = { visible: false }, action) => {
    switch (action.type) {
        case types.messageRecived:
            return { visible: true, message: action.payload }
        case types.messageClose:
            return { visible: false }
        default:
            return state
    }
}