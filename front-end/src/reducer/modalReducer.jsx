import types from "../types/modalType";

export const modalSolicitudReducer = (state = { solicitudModalOpen: false, solicitudModal: {} }, action) => {
    switch (action.type) {
        case types.modalOpenSolicitud:
            return {
                ...state,
                solicitudModalOpen: true,
                solicitudModal: action.payload
            }
        case types.modalCloseSolicitud:
            return {
                solicitudModalOpen: false,
                solicitudModal: {}
            }
        default:
            return state;
    }
}

export const modalProviderReducer = (state = { providerModalOpen: false, providerModal: {} }, action) => {
    switch (action.type) {
        case types.modalOpenProvider:
            return {
                ...state,
                providerModalOpen: true,
                providerModal: action.payload
            }
        case types.modalCloseProvider:
            return {
                providerModalOpen: false,
                providerModal: {}
            }
        default:
            return state;
    }
}

export const modalMessengerReducer = (state = { messengerModalOpen: false, messengerModal: {} }, action) => {
    switch (action.type) {
        case types.modalOpenMessenger:
            return {
                ...state,
                messengerModalOpen: true,
                messengerModal: action.payload
            }
        case types.modalCloseMessenger:
            return {
                messengerModalOpen: false,
                messengerModal: {}
            }
        default:
            return state;
    }
}