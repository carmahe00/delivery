const { Router } = require('express');
const { getCiudades, addCiudades, updateCiudades } = require('../controllers/ciudades')
const { check } = require('express-validator');

const { validarJWT, validarROLE } = require('../middleware/validar-jwt');
const { validarCampos } = require('../middleware/validar-campos');
const Authentication = require('../middleware/static');

const router = Router();

router.get("/", [
    Authentication.ensureRole(['ADMINISTRADOR']),
    validarJWT,
    validarROLE,
    validarCampos
], getCiudades)

router.post("/", [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    Authentication.ensureRole('ADMINISTRADOR'),
    validarJWT,
    validarROLE,
    validarCampos
], addCiudades)

router.put('/:id', [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    Authentication.ensureRole('ADMINISTRADOR'),
    validarJWT,
    validarROLE,
    validarCampos
], updateCiudades)

module.exports = router