import types from '../types/historyTypes';

export const historyReducer = (state = { loading: false, pedidos: [] }, action) => {
    switch (action.type) {
        case types.pedidoRequest:
            return { loading: true }
        case types.pedidoSuccess:
            return { loading: false, pedidos: action.payload }
        case types.pedidoError:
            return { loading: false, error: action.payload }
        case types.pedidoReset:
            return { loading: false, pedidos: []}
        
        default:
            return state
    }
}

