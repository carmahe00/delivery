const { Router } = require('express');
const { usuarios } = require('../models');
const { check, body, param } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const bcrypt = require('bcryptjs');
const { loginUser } = require('../controllers/usuario');

const router = Router();

router.post("/login", [
    check("email", "El email es oblogatorio y debe ser email").isEmail().notEmpty(),
    check('password', 'El password es obligatorio').notEmpty(),
    body('email').custom(async (value, { req }) => {

        const { password } = req.body
        const usuario = await usuarios.findOne({
            where: { email: value }
        })
        if (!usuario)
            return Promise.reject('Usuario o contraseña incorrecta')
        const res = await bcrypt.compare(password, usuario.clave);
        if (!res)
            return Promise.reject('Usuario o contraseña incorrecta')

    }),
    validarCampos
], loginUser)

module.exports = router
