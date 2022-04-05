const { Router } = require("express");
const { check, body, param, query } = require("express-validator");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

const { usuarios } = require("../models");
const Authentication = require("../middleware/static");
const {
  loginUser,
  getUsers,
  addUsuario,
  updateUsuario,
  changePassword,
  getUsersCharge,
} = require("../controllers/usuario");
const { validarCampos, matchData } = require("../middleware/validar-campos");
const { validarJWT, validarROLE } = require("../middleware/validar-jwt");

const router = Router();

router.get(
  "/",
  [
    Authentication.ensureRole(["ADMINISTRADOR", "COORDINADOR"]),
    query("type"),
    validarJWT,
    validarROLE,
    validarCampos,
  ],
  getUsers
);

router.get(
  "/charge-users",
  [
    Authentication.ensureRole(["ADMINISTRADOR", "COORDINADOR"]),
    validarJWT,
    validarROLE,
    validarCampos,
  ],
  getUsersCharge
);

router.post(
  "/login",
  [
    check("email", "El email es oblogatorio y debe ser email")
      .isEmail()
      .notEmpty(),
    check("password", "El password es obligatorio").notEmpty(),
    body("email").custom(async (value, { req }) => {
      const { password } = req.body;
      const usuario = await usuarios.findOne({
        where: { email: value },
      });
      if (!usuario) return Promise.reject("Usuario o contraseña incorrecta");
      const res = await bcrypt.compare(password, usuario.clave);
      if (!res) return Promise.reject("Usuario o contraseña incorrecta");
    }),
    validarCampos,
  ],
  loginUser
);

router.post("/password", [
  validarJWT,
  body("oldPassword", "El viejo password e obligatorio").custom(
    async (value, { req }) => {
      
      const usuario = await usuarios.findOne({
        where: {
          uuid: {
            [Op.eq]: req.uuid,
          },
        },
      });
      if (!usuario) return Promise.reject("Usuario o contraseña incorrecta");
      const res = await bcrypt.compare(value, usuario.clave);
      if (!res) return Promise.reject("Usuario o contraseña incorrecta");
      
    }
  ),
  check("password", "La nueva contraseña obligatoria").notEmpty(),
  validarCampos,
], changePassword);

router.post(
  "/",
  [
    Authentication.ensureRole(["ADMINISTRADOR", "COORDINADOR"]),
    check("email", "El email es oblogatorio y debe ser email")
      .isEmail()
      .notEmpty(),
    body("email").custom(async (value, { req }) => {
      const usuarioDB = await usuarios.findOne({
        where: { email: value },
      });
      if (usuarioDB) return Promise.reject("E-mail ya existe");
    }),
    check("clave", "El clave es obligatorio").notEmpty(),
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("id_ciudad", "El campo ciudad es obligatorio").notEmpty(),
    check("direccion", "El direccion es obligatorio").notEmpty(),
    check("celular", "El celular es obligatorio").notEmpty(),
    check("latitud"),
    check("longitud"),
    check("imagen"),
    check("type"),
    check("tipo_vehiculo"),
    check("placa"),
    check("fecha_tecnomecanica"),
    check("fecha_obligatorio"),
    check("fecha_obligatorio"),
    check("tipocobro"),
    check("cobro"),
    check("tipousuario"),
    matchData,
    validarJWT,
    validarROLE,
    validarCampos,
  ],
  addUsuario
);

router.put(
  "/:uuid",
  [
    Authentication.ensureRole(["ADMINISTRADOR", "COORDINADOR"]),
    param("uuid", "El identificador es obligatorio").notEmpty(),
    check("email", "El email es oblogatorio y debe ser email")
      .isEmail()
      .notEmpty(),
    check("id_ciudad", "El campo ciudad es obligatorio").notEmpty(),
    check("clave", "El clave es obligatorio"),
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("direccion", "El direccion es obligatorio").notEmpty(),
    check("celular", "El celular es obligatorio").notEmpty(),
    check("latitud"),
    check("longitud"),
    check("imagen"),
    check("tipo_vehiculo"),
    check("placa"),
    check("fecha_tecnomecanica"),
    check("fecha_obligatorio"),
    check("cobro"),
    check("tipocobro"),
    check("tipousuario"),
    matchData,
    validarJWT,
    validarROLE,
    validarCampos,
  ],
  updateUsuario
);


module.exports = router;
