import types from "../types/socketType";

export const pedidosRecive = (data) => ({
  type: types.pedidosRecive,
  payload: data,
});
export const pedidoRecive = (data) => ({
  type: types.pedidoRecive,
  payload: data,
});
export const pedidoReset = () => ({ type: types.pedidoReset });
