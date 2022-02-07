import types from "../types/cityType";

export const cityListReducer = (state = { cities: [] }, action) => {
    switch (action.type) {
        case types.cityListRequest:
            return { loading: true }
        case types.cityListSuccess:
            return { loading: false, cities: action.payload }
        case types.cityListFail:
            return { loading: false, error: action.payload }
        case types.cityListReset:
            return { cities: [] }
        default:
            return state;
    }
}

export const cityCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case types.cityCreateRequest:
            return { loading: true }
        case types.cityCreateSuccess:
            return { loading: false, city: action.payload }
        case types.cityCreateFail:
            return { loading: false, error: action.payload }
        case types.cityCreateReset:
            return {}
        default:
            return state
    }
}

export const cityUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case types.cityUpdateRequest:
            return { loading: true }
        case types.cityUpdateSuccess:
            return { loading: false, city: action.payload }
        case types.cityUpdateFail:
            return { loading: false, error: action.payload }
        case types.cityUpdateReset:
            return {}
        default:
            return state
    }
}

export const cityDeleteReducer = (state = { loading: false }, action) => {
    switch (action.type) {
        case types.cityDeleteRequest:
            return { loading: true }
        case types.cityDeleteSuccess:
            return { loading: false, success: true }
        case types.cityDeleteFail:
            return { loading: false, success: false }

        default:
            return state
    }
}
