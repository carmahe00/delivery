import types from "../types/socketType"

export const userConnectReducer = (state = { connect: false }, action) => {
    switch (action.type) {
        case types.userConnect:
            return { ...state, connect: true }
        case types.userDisconnet:
            return { ...state, connect: false }
        default:
            return state
    }
}

export const pedidosReducer = (state = {pedidos:  []}, action) =>{
    switch (action.type) {
        case types.pedidosRecive:
            return {...state, pedidos: action.payload.filter(pedido => pedido.estado === "BUSCANDO")}
        case types.pedidosADD:
            return {...state, loadingAddPedido: true}
        default:
            return state
    }
}
