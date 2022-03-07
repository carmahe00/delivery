const { domicilios, usuarios, ciudades } = require("../models");
const { Op } = require("sequelize");

const grabarDomicilio = async (payload) => {
  try {
    console.log(payload);
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
      include: { model: ciudades, as: "ciudad" },
    });
    console.log(data);
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
      include: { model: usuarios, as: "proveedor" },
    });
    domicilio.id_usuario = usuario.id_usuario;
    domicilio.estado = "VA_RECOGER";
    return await domicilio.save();
  } catch (error) {
    return error;
  }
};

const changeStateCamino = async (payload) => {
  try {
    const { estado, id_pedido } = payload;
    if (estado !== "VA_RECOGER")
      throw new Error("No se está listo para recoger");

    const domicilio = await domicilios.findOne({
      where: {
        id_pedido: {
          [Op.eq]: id_pedido,
        },
      },
      include: { model: usuarios, as: "proveedor" },
    });

    domicilio.estado = "EN_CAMINO";
    return await domicilio.save();
  } catch (error) {
    return error;
  }
};

const changeStateEntregado = async (payload) => {
  try {
    const { estado, id_pedido } = payload;
    if (estado !== "EN_CAMINO") throw new Error("No se ha entragado");

    const domicilio = await domicilios.findOne({
      where: {
        id_pedido: {
          [Op.eq]: id_pedido,
        },
      },
      include: { model: usuarios, as: "proveedor" },
    });

    domicilio.estado = "ENTREGADO";
    return await domicilio.save();
  } catch (error) {
    return error;
  }
};

const changeStateConfrimado = async (payload) => {
  try {
    const { estado, id_pedido } = payload;
    if (estado !== "ENTREGADO") throw new Error("No se ha entragado");

    const domicilio = await domicilios.findOne({
      where: {
        id_pedido: {
          [Op.eq]: id_pedido,
        },
      },
      include: { model: usuarios, as: "proveedor" },
    });

    domicilio.estado = "ENTREGADO_CONFIRMADO";
    return await domicilio.save();
  } catch (error) {
    return error;
  }
};

const changeStateCancel = async (payload) => {
  try {
    const { id_pedido } = payload;
    const domicilio = await domicilios.findOne({
      where: {
        id_pedido: {
          [Op.eq]: id_pedido,
        },
      },
      include: { model: usuarios, as: "proveedor" },
    });
    domicilio.estado = "ANULADO";
    return await domicilio.save();
  } catch (error) {
    return error;
  }
};

const allDomicilios = async () => {
  try {
    return await domicilios.findAll({
      include: { model: usuarios, as: "usuario" },
      where: {
        [Op.and]: [
          {
            estado: {
              [Op.ne]: "ANULADO",
            },
          },
          {
            estado: {
              [Op.ne]: "ENTREGADO_CONFIRMADO",
            },
          },
        ],
      },
    });
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
  changeStateCamino,
  changeStateEntregado,
  changeStateConfrimado,
  changeStateCancel,
};
