const bcrypt = require("bcryptjs");
const { request, response } = require("express");
const { Op } = require("sequelize");
const { generarJWT } = require("../helpers/jwt");
const { usuarios, ciudades, sequelize } = require("../models");
const {
  administradores,
  coordinadores,
  proveedores,
  defaultRoute,
} = require("../utils/links");

const loginUser = async (req = request, res = response) => {
  try {
    const email = req.body.email.trim().toLowerCase();
    let usuarioDB = await usuarios.findOne({
      where: { email },
      raw: true,
      include: { model: ciudades, as: "ciudad" },
    });
    const token = await generarJWT(usuarioDB.uuid, usuarioDB.nombre);
    let routes = null;
    switch (usuarioDB.rol) {
      case "ADMINISTRADOR":
        routes = administradores;
        break;
      case "COORDINADOR":
        routes = coordinadores;
        break;
      case "PROVEEDORES":
        routes = proveedores;
        break;
      default:
        routes = defaultRoute;
        break;
    }
    delete usuarioDB.clave;

    return res.json({
      usuario: { ...usuarioDB, routes },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Algo salió mal",
    });
  }
};

const getUsers = async (req = request, res = response) => {
  try {
    let rol;
    switch (req.rol) {
      case "ADMINISTRADOR":
        rol = "COORDINADOR";
        break;
      case "COORDINADOR":
        req.query.type === "PROVEEDORES"
          ? (rol = "PROVEEDORES")
          : (rol = "DOMICILIARIOS");
        break;
      
      default:
        rol = "DOMICILIARIOS";
        break;
    }
    const usuariosDB = await usuarios.findAll({
      where: { rol },
      include: { model: ciudades, as: "ciudad" },
      order: [['id_usuario', 'DESC']]
    });
    return res.send(usuariosDB);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Algo salió mal",
    });
  }
};

const getUsersCharge = async (req = request, res = response) => {
  try {
    const usuariosDB = await usuarios.findAll({
      where: {
        rol: {
          [Op.or]: {
            [Op.between]: ["DOMICILIARIOS", "PROVEEDORES"],
          },
        },
      },
      include: { model: ciudades, as: "ciudad" },
    });
    return res.send(usuariosDB);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Algo salió mal",
    });
  }
};

const addUsuario = async (req = request, res = response) => {
  const t = await sequelize.transaction();
  try {
    let clave = bcrypt.hashSync(req.body.clave);

    switch (req.rol) {
      case "ADMINISTRADOR":
        req.body.rol = "COORDINADOR";
        break;
      case "COORDINADOR":
        req.body.type === "PROVEEDORES"
          ? (req.body.rol = "PROVEEDORES")
          : (req.body.rol = "DOMICILIARIOS");
        break;

      default:
        req.body.rol = "DOMICILIARIOS";
        break;
    }
    delete req.body.type;
    const email = req.body.email.trim().toLowerCase();
    const usuarioDB = await usuarios.create({ ...req.body, clave, email },{
      transaction: t
    });
    await t.commit();
    return res.status(201).send(usuarioDB);
  } catch (error) {
    await t.rollback();
    console.log(error);
    return res.status(500).json({
      msg: "Algo salió mal",
    });
  }
};

const updateUsuario = async (req = request, res = response) => {
  const t = await sequelize.transaction();
  try {
    
    const {
      email,
      clave,
      nombre,
      direccion,
      celular,
      id_ciudad,
      latitud,
      longitud,
      imagen,
      tipo_vehiculo,
      placa,
      fecha_tecnomecanica,
      fecha_obligatorio,
      cobro,
      tipocobro,
      tipousuario,
    } = req.body;
    const usuario = await usuarios.findOne({
      where: {
        uuid: req.params.uuid,
      },
    });
    usuario.email = email;
    if (clave) usuario.clave = bcrypt.hashSync(clave);
    usuario.nombre = nombre;
    usuario.direccion = direccion;
    usuario.celular = celular;
    usuario.id_ciudad = id_ciudad;
    usuario.latitud = latitud ? latitud : 0.0;
    usuario.longitud = longitud ? longitud : 0.0;
    usuario.imagen = imagen && imagen;
    usuario.tipo_vehiculo = tipo_vehiculo && tipo_vehiculo;
    usuario.placa = placa && placa;
    usuario.fecha_tecnomecanica = fecha_tecnomecanica && fecha_tecnomecanica;
    usuario.fecha_obligatorio = fecha_obligatorio && fecha_obligatorio;
    usuario.tipocobro = tipocobro || null;
    usuario.cobro = cobro || 0;
    usuario.tipousuario = tipousuario || null;
    await usuario.save({ transaction: t });
    await t.commit();
    return res.status(201).send(usuario);
  } catch (error) {
    await t.rollback();
    console.log(error);
    return res.status(500).json({
      msg: "Algo salió mal",
    });
  }
};

const changePassword = async (req = request, res = response) => {
  try {
    const { password, uuid } = req.body;
    const usuario = await usuarios.findOne({
      where: {
        uuid: {
          [Op.eq]: req.uuid,
        },
      },
    });
    usuario.clave = bcrypt.hashSync(password);
    await usuario.save();
    return res.status(201).send(usuario);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Algo salió mal",
    });
  }
};

module.exports = {
  loginUser,
  getUsers,
  addUsuario,
  updateUsuario,
  changePassword,
  getUsersCharge,
};
