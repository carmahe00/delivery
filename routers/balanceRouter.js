const { Router } = require("express");
const { getSueldo } = require("../controllers/sueldos");
const { validarJWT } = require("../middleware/validar-jwt");

const router = Router();

router.get("/:uuid", [validarJWT], getSueldo);

module.exports = router
