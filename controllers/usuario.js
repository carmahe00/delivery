const { request, response } = require('express');
const { generarJWT } = require('../helpers/jwt');
const { usuarios } = require("../models");
const { administradores, coordinadores } = require('../uils/links');

const loginUser = async (req = request, res = response) => {
    try {
        const { email } = req.body
        let usuarioDB = await usuarios.findOne({
            where: { email },
            raw: true
        })
        const token = await generarJWT(usuarioDB.uuid, usuarioDB.nombre)
        let routes = null;
        switch (usuarioDB.rol) {
            case 'ADMINISTRADOR':
                routes = administradores
                break;
            case 'COORDINADOR':
                routes = coordinadores
                break;
            default:
                break;
        }
        delete usuarioDB.clave
        delete usuarioDB.id_usuario
        return res.json({
            usuario: {...usuarioDB, routes},
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Algo salió mal'
        })
    }
}

module.exports = {
    loginUser
}
