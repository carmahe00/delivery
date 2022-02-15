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