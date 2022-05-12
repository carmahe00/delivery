import types from "../types/modalType";

export const openModalSolicitud = () => ({
  type: types.modalOpenSolicitud,
  payload: {},
});

export const closeModalSolicitud = () => ({ type: types.modalCloseSolicitud });

export const openModalSolicitudData = (data) => ({
  type: types.modalOpenSolicitud,
  payload: data,
});

export const openModalProvider = () => ({
  type: types.modalOpenProvider,
  payload: {},
});

export const closeModalProvider = () => ({ type: types.modalCloseProvider });

export const openModalProviderData = (data) => ({
  type: types.modalOpenProvider,
  payload: data,
});

export const openModalMessenger = () => ({
  type: types.modalOpenMessenger,
  payload: {},
});

export const closeModalMessenger = () => ({ type: types.modalCloseMessenger });

export const openModalMessengerData = (data) => ({
  type: types.modalOpenMessenger,
  payload: data,
});
