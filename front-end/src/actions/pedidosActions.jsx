import types from '../types/socketType';

export const pedidosRecive = (data) => ({type: types.pedidosRecive, payload: data})
export const pedidosAdd = (data) => ({type: types.pedidosRecive, payload: data})
export const pedidosErr = (error) => ({type: types.pedidosERR, payload: error})
export const pedidosCLOSE = () => ({type: types.pedidosCLOSE})

