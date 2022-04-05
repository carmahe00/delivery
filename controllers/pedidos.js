const { request, response } = require("express");
const { domicilios, usuarios } = require("../models");
const { Op } = require("sequelize");

const getdomicilios = async (req = request, res = response) => {
  try {
    let domiciliosRes;
    req.rol === "DOMICILIARIOS"
      ? (domiciliosRes = await domicilios.findAll({
          where: {
            id_usuario: {
              [Op.eq]: req.id,
            },
            [Op.or]: [
              {
                estado: {
                  [Op.eq]: "ANULADO",
                },
              },
              {
                estado: {
                  [Op.eq]: "ENTREGADO_CONFIRMADO",
                },
              },
              {
                estado: {
                  [Op.eq]: "ENTREGADO",
                },
              },
            ],
          },
        }))
      : (domiciliosRes = await domicilios.findAll({
          where: {
            id_proveedor: {
              [Op.eq]: req.id,
            },
            [Op.or]: [
              {
                estado: {
                  [Op.eq]: "ANULADO",
                },
              },
              {
                estado: {
                  [Op.eq]: "ENTREGADO_CONFIRMADO",
                },
              },
            ],
          },
          include: {
            model: usuarios,
            as: "usuario",
            attributes: [
              "celular",
              "direccion",
              "email",
              "imagen",
              "nombre",
              "uuid",
            ],
          },
        }));

    return res.send(domiciliosRes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Algo salió mal",
    });
  }
};

const getDomicilio = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const pedido = await domicilios.findOne({
      where: {
        id_pedido: {
          [Op.eq]: id,
        },
      },
      include: {
        model: usuarios,
        as: "proveedor",
        attributes: [
          "celular",
          "direccion",
          "email",
          "imagen",
          "nombre",
          "uuid",
        ],
      },
    });
    if (!pedido)
      return res.status(404).json({
        ok: false,
        msg: "Pedido no exite",
      });

    return res.send(pedido);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Algo salió mal",
    });
  }
};

module.exports = {
  getdomicilios,
  getDomicilio,
};
