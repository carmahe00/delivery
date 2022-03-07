const { request, response } = require("express");
const { domicilios } = require("../models");
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
        }));

    return res.send(domiciliosRes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Algo salió mal",
    });
  }
};

module.exports = {
  getdomicilios,
};
