const { domicilios, usuarios } = require("../models");
const { Op } = require("sequelize");

const grabarDomicilio = async (payload) => {
  try {
    let isPreviewsDomocilio;
    const {
      entregar,
      recoger,
      tipo_vehiculo,
      valor_domicilio,
      valor_pedido,
      asegurar,
      valor_seguro,
      evidencia,
      forma_pago,
      celular,
      nombre,
      descripcion,
    } = payload;
    isPreviewsDomocilio = payload.id_pedido
      ? await domicilios.findOne({
          where: {
            id_pedido: {
              [Op.eq]: payload.id_pedido,
            },
          },
        })
      : null;
    if (isPreviewsDomocilio)
      if (isPreviewsDomocilio.estado !== "BUSCANDO")
        throw new Error("El pedido ya fue solicitado");
    if (isPreviewsDomocilio) {
      isPreviewsDomocilio.entregar = entregar;
      isPreviewsDomocilio.recoger = recoger;
      isPreviewsDomocilio.tipo_vehiculo = tipo_vehiculo;
      isPreviewsDomocilio.valor_domicilio = valor_domicilio;
      isPreviewsDomocilio.valor_pedido = valor_pedido;
      isPreviewsDomocilio.asegurar = asegurar;
      isPreviewsDomocilio.valor_seguro = valor_seguro;
      isPreviewsDomocilio.evidencia = evidencia;
      isPreviewsDomocilio.forma_pago = forma_pago;
      isPreviewsDomocilio.celular = celular;
      isPreviewsDomocilio.nombre = nombre;
      isPreviewsDomocilio.descripcion = descripcion;
      return await isPreviewsDomocilio.save();
    }
    const solicitud = await domicilios.create(payload);
    return solicitud;
  } catch (error) {
    return error;
  }
};

const fetchDetails = async (payload) => {
  try {
    const data = await usuarios.findOne({
      where: {
        uuid: {
          [Op.eq]: payload.usuario.uuid,
        },
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const changeSteteDomicilio = async (payload, usuario) => {
  try {
    const { estado, id_pedido } = payload;
    if (estado !== "BUSCANDO") throw new Error("Ya tomaron el pedido");

    const domicilio = await domicilios.findOne({
      where: {
        id_pedido: {
          [Op.eq]: id_pedido,
        },
      },
    });
    domicilio.id_usuario = usuario.id_usuario;
    domicilio.estado = "VA_RECOGER";
    return await domicilio.save();
  } catch (error) {
    return error;
  }
};

const allDomicilios = async () => {
  try {
    return await domicilios.findAll();
  } catch (error) {
    console.log(error);
    return error;
  }
};

const waitingDomiciled = async () => {
  try {
    return await domicilios.findAll({
      where: {
        estado: {
          [Op.eq]: "BUSCANDO",
        },
      },
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  grabarDomicilio,
  allDomicilios,
  waitingDomiciled,
  fetchDetails,
  changeSteteDomicilio,
};
