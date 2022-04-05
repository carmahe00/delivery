const { request, response } = require("express");
const { Op } = require("sequelize");
const { v_saldo, usuarios } = require("../models");

const getSueldo = async (req = request, res = response) => {
  try {
    const sueldo = await v_saldo.findOne({
      include: {
        model: usuarios,
        where: {
          uuid: {
            [Op.eq]: req.params.uuid,
          },
        },
        attributes: []
      },
    });
    return res.send(sueldo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Algo salió mal",
    });
  }
};

module.exports = {
  getSueldo,
};
