import types from '../types/modalType';

export const openModalSolicitud = () => ({ type: types.modalOpenSolicitud, payload: {} });

export const closeModalSolicitud = () => ({ type: types.modalCloseSolicitud });

export const openModalSolicitudData = (data) => ({ type: types.modalOpenSolicitud, payload: data });