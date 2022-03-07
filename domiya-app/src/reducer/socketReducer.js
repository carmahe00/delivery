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
  state = { pedidos: [], pedido: {}, success: false },
  action
) => {
  switch (action.type) {
    case types.pedidosRecive:
      return {
        ...state,
        pedidos: action.payload.filter(
          (pedido) => pedido.estado === "BUSCANDO" && action.tipo_vehiculo === pedido.tipo_vehiculo
        ),
      };
    case types.pedidoRecive:
      return { ...state, pedido: action.payload, success: true };
    case types.pedidoRecive:
      return { ...state, pedido: {}, success: true };
    default:
      return state;
  }
};
