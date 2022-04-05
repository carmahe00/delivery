const {Router} = require('express');
const { check } = require('express-validator');
const {getRecargas, addRecargas, updateRecarga, deleteRecarga } = require('../controllers/recargas');
const { validarJWT, validarROLE } = require('../middleware/validar-jwt');
const { validarCampos } = require('../middleware/validar-campos');
const Authentication = require('../middleware/static');

const router = Router();


router.get("/", [
    Authentication.ensureRole(['ADMINISTRADOR', 'COORDINADOR']),
    validarJWT,
    validarROLE,
    validarCampos
], getRecargas)

router.post("/", [
    check('valor', 'El valor es obligatorio').isNumeric(),
    Authentication.ensureRole(['ADMINISTRADOR', 'COORDINADOR']),
    validarJWT,
    validarROLE,
    validarCampos
], addRecargas)

router.put('/:id', [
    check('valor', 'El valor es obligatorio').isNumeric(),
    Authentication.ensureRole(['ADMINISTRADOR', 'COORDINADOR']),
    validarJWT,
    validarROLE,
    validarCampos
], updateRecarga)

router.delete('/:id', [
    Authentication.ensureRole(['ADMINISTRADOR', 'COORDINADOR']),
    validarJWT,
    validarROLE,
    validarCampos
], deleteRecarga)

module.exports = router