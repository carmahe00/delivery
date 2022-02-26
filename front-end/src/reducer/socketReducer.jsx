import types from "../types/socketType";

export const userConnectReducer = (state = { connect: false }, action) => {
  switch (action.type) {
    case types.userConnect:
      return { ...state, connect: true };
    case types.userDisconnet:
      return { ...state, connect: false };
    default:
      return state;
  }
};

export const pedidosReducer = (
  state = { pedidos: [], isError: false },
  action
) => {
  switch (action.type) {
    case types.pedidosRecive:
      console.log(action.payload);
      return { ...state, pedidos: action.payload.filter(pedido => pedido.id_proveedor === action.usuario) };
    case types.pedidosADD:
      return { ...state, loadingAddPedido: true };
    case types.pedidosERR:
      return { ...state, isError: true, error: action.payload };
    case types.pedidosCLOSE:
      return { ...state, isError: false };
    default:
      return state;
  }
};
