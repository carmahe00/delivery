import types from '../types/rechargeType';

export const rechargeReducer = (state = { loading: false, recharges: [] }, action) => {
    switch (action.type) {
        case types.rechargeListRequest:
            return { ...state, loading: true }
        case types.rechargeListSuccess:
            return { ...state, loading: false, recharges: action.payload }
        case types.rechargeListFail:
            return { ...state, loading: false, error: action.payload }
        case types.rechargeListReset:
            return { recharges: [] }
        case types.rechargeCreateRequest:
            return { ...state, loadingCreate: true }
        case types.rechargeCreateSuccess:
            return { ...state, loadingCreate: false, recharges: [...state.recharges, action.payload] }
        case types.rechargeCreateFail:
            return { ...state, loadingCreate: false, errorCreate: action.payload }
        case types.rechargeUpdateRequest:
            return { ...state, loadingUpdate: true }
        case types.rechargeUpdateSuccess:
            const recharge = action.payload
            const existrecharge = state.recharges.find(r => r.id_recarga === recharge.id_recarga)
            if (existrecharge)
                return {
                    ...state,
                    recharges: state.recharges.map(u => 
                        (u.id_recarga === existrecharge.id_recarga) ? recharge : u
                    )
                }
            return { ...state }
        case types.rechargeUpdateFail: 
            return { ...state, loadingUpdate: false, errorUpdate: action.payload }
        case types.rechargeDeleteRequest: 
            return {...state, loadingDelete: true}
        case types.rechargeDeleteSuccess:
            return { ...state, loadingDelete: false ,recharges: state.recharges.filter(r => r.id_recarga !== action.payload) }
        case types.rechargeDeleteFail: 
            return { ...state, loadingDelete: false, errorDelete: action.payload }
        default:
            return state;
    }
}
