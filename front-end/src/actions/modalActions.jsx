import types from '../types/modalType';

export const openModalSolicitud = () => ({ type: types.modalOpenSolicitud, payload: {} });

export const closeModalSolicitud = () => ({ type: types.modalCloseSolicitud });
