import types from '../types/balanceType';

export const balanceReducer = (state = { loading: false, valor: {} }, action) => {
    switch (action.type) {
        case types.valorRequest:
            return { loading: true }
        case types.valorSuccess:
            return { loading: false, valor: action.payload }
        case types.valorError:
            return { loading: false, error: action.payload }
        case types.valorReset:
            return { loading: false, valor: {}}
        
        default:
            return state
    }
}

