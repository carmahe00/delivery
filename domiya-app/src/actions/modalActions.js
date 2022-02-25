import types from "../types/modalType";

export const openModal = (data) => ({ type: types.modalOpen, payload: data });
export const closeModal = () => ({ type: types.modalClose });
