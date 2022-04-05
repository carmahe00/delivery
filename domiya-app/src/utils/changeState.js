export const changeState = (state) => {
  switch (state) {
    case "BUSCANDO":
      return "BUSCANDO";
    case "VA_RECOGER":
      return "VA RECOGIENDO";
    case "EN_CAMINO":
      return "EN CAMINO";
    case "ENTREGADO":
      return "ENTREGADO";
    case "ENTREGADO_CONFIRMADO":
      return "ENTREGADO Y CONFIRMADO";
    case "ANULADO":
      return "ANULADO";
    default:
      return "BUSCANDO";
  }
};
