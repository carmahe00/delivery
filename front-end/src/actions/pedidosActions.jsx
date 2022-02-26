import types from '../types/socketType';

export const pedidosRecive = (data, id_usuario) => ({type: types.pedidosRecive, payload: data, usuario: id_usuario})
export const pedidosAdd = (data) => ({type: types.pedidosRecive, payload: data})
export const pedidosErr = (error) => ({type: types.pedidosERR, payload: error})
export const pedidosCLOSE = () => ({type: types.pedidosCLOSE})

