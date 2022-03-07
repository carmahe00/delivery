import types from "../types/socketType";

export const pedidosRecive = (data, tipo_vehiculo) => ({
  type: types.pedidosRecive,
  payload: data,
  tipo_vehiculo
});
export const pedidoRecive = (data) => ({
  type: types.pedidoRecive,
  payload: data,
});
export const pedidoReset = () => ({ type: types.pedidoReset });
