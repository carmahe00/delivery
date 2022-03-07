const { response } = require("express");
const { usuarios } = require('../models');
const jwt = require('jsonwebtoken');

const validarJWT = (req = request, res = response, next) => {
    try {
        const token = req.header('Authorization')
        if (!token)
            return res.status(401).json({

                msg: "No hay token en la petición"
            })


        const { uuid } = jwt.verify(token, process.env.JWT_SECRET)

        req.uuid = uuid
        next()

    } catch (error) {
        console.log('No autorizado')
        return res.status(401).json({
            ok: false,
            msg: 'Token no es válido'
        })
    }
}

const validarROLE = async (req, resp, next) => {
    const uuid = req.uuid;
    try {
        const usuarioDB = await usuarios.findOne({
            where: { uuid }
        });
        if (!usuarioDB) {
            return resp.status(404).json({
                ok: false,
                msg: 'Usuario no exite'
            })
        }
        
        if (!req.roles.includes(usuarioDB.rol))
            return resp.status(403).json({
                ok: false,
                msg: 'Usuario no tiene privilegios para hacer eso'
            })
        
        req.rol = usuarioDB.rol
        
        req.id = (req.rol === "DOMICILIARIOS" || req.rol === "PROVEEDORES")  && usuarioDB.id_usuario


        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


module.exports = { validarJWT, validarROLE } 