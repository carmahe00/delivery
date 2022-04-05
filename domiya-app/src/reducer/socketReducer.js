import type from "../types/socketType";
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
  state = { pedidos: [], pedido: {}, success: false, loading: false },
  action
) => {
  switch (action.type) {
    case types.pedidoRequest:
      return {
        ...state,
        loading: true,
      };
    case types.pedidosRecive:
      let pedidos =
        action.tipousuario === "ESPECIAL"
          ? action.payload.filter(
              (pedido) =>
                pedido.estado === "BUSCANDO" &&
                action.tipo_vehiculo === pedido.tipo_vehiculo
            )
          : action.payload.filter(
              (pedido) =>
                pedido.estado === "BUSCANDO" &&
                action.tipo_vehiculo === pedido.tipo_vehiculo &&
                pedido.tipousuario === "GENERAL"
            );
      return {
        ...state,
        pedidos,
      };
    case types.pedidoRecive:
      return {
        ...state,
        pedido: action.payload,
        success: true,
        loading: false,
      };
    case types.pedidoReset:
      return { ...state, pedido: {}, success: true, loading: false };
    case types.pedidoError:
      return { ...state, error: action.payload };
    case types.pedidosLogout:
      return { pedidos: [], pedido: {}, success: false, loading: false };
    default:
      return state;
  }
};
