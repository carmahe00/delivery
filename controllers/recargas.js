const { request, response } = require("express");
const { recargas } = require("../models");

const getRecargas = async (req = request, res = response) => {
  try {
    const Recargas = await recargas.findAll();
    return res.send(Recargas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Algo salió mal",
    });
  }
};

const addRecargas = async (req = request, res = response) => {
  try {
    const recarga = await recargas.create(req.body);
    return res.status(201).send(recarga);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Algo salió mal",
    });
  }
};

const updateRecarga = async (req = request, res = response) => {
  try {
    const { valor, id_usuario, tipo } = req.body;
    const recarga = await recargas.findOne({
      where: {
        id_recarga: req.params.id,
      },
    });
    recarga.valor = valor;
    recarga.id_usuario = id_usuario;
    recarga.tipo = tipo;
    await recarga.save();

    return res.status(201).send(recarga);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Algo salió mal",
    });
  }
};

const deleteRecarga = async (req = request, res = response) => {
  try {
    
    await recargas.destroy({
      where: {
        id_recarga: req.params.id,
      },
    });

    return res.json({ message: "Recarga Eliminada!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Algo salió mal",
    });
  }
};

module.exports = {
  getRecargas,
  addRecargas,
  updateRecarga,
  deleteRecarga,
};
