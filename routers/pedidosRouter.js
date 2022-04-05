const { Router } = require("express");

const { getdomicilios, getDomicilio } = require("../controllers/pedidos");
const { validarJWT, validarROLE } = require("../middleware/validar-jwt");
const { validarCampos } = require("../middleware/validar-campos");
const Authentication = require("../middleware/static");

const router = Router();

router.get(
  "/",
  [
    Authentication.ensureRole([
      "ADMINISTRADOR",
      "COORDINADOR",
      "DOMICILIARIOS",
      "PROVEEDORES"
    ]),
    validarJWT,
    validarROLE,
    validarCampos,
  ],
  getdomicilios
);

router.get(
  "/:id",
  [
    validarJWT,
    validarCampos,
  ],
  getDomicilio
);

module.exports = router;
