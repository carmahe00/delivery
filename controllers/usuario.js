const bcrypt = require('bcryptjs');
const { request, response } = require('express');
const { generarJWT } = require('../helpers/jwt');
const { usuarios, ciudades } = require("../models");
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
            usuario: { ...usuarioDB, routes },
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Algo salió mal'
        })
    }
}

const getUsers = async (req = request, res = response) => {
    try {

        let rol
        switch (req.rol) {
            case "ADMINISTRADOR":
                rol = "COORDINADOR"
                break;
            case "COORDINADOR":
                req.query.type === "PROVEEDORES" ?
                    rol = "PROVEEDORES" :
                    rol = "DOMICILIARIOS"
                break;

            default:
                rol = "DOMICILIARIOS"
                break;
        }
        const usuariosDB = await usuarios.findAll({
            where: { rol },
            include: { model: ciudades, as: 'ciudad' },
        });
        return res.send(usuariosDB)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Algo salió mal'
        })
    }
}




const addUsuario = async (req = request, res = response) => {
    try {

        let clave = bcrypt.hashSync(req.body.clave)

        switch (req.rol) {
            case "ADMINISTRADOR":
                req.body.rol = "COORDINADOR"
                break;
            case "COORDINADOR":
                req.body.type === "PROVEEDORES" ?
                    req.body.rol = "PROVEEDORES" :
                    req.body.rol = "DOMICILIARIOS"
                break;

            default:
                req.body.rol = "DOMICILIARIOS"
                break;
        }
        delete req.body.type
        const usuarioDB = await usuarios.create({ ...req.body, clave })
        return res.status(201).send(usuarioDB)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Algo salió mal'
        })
    }
}

const updateUsuario = async (req = request, res = response) => {
    try {
        
        const { email, clave, nombre, direccion, celular, id_ciudad,
            latitud,
            longitud,
            imagen,
            tipo_vehiculo,
            placa,
            fecha_tecnomecanica,
            fecha_obligatorio
        } = req.body
        const usuario = await usuarios.findOne({
            where: {
                uuid: req.params.uuid
            }
        })
        usuario.email = email;
        usuario.clave = bcrypt.hashSync(clave)
        usuario.nombre = nombre
        usuario.direccion = direccion
        usuario.celular = celular
        usuario.id_ciudad = id_ciudad
        usuario.latitud = latitud ? latitud : 0.0
        usuario.longitud = longitud ? longitud : 0.0
        usuario.imagen = imagen && imagen
        usuario.tipo_vehiculo = tipo_vehiculo && tipo_vehiculo
        usuario.placa = placa && placa
        usuario.fecha_tecnomecanica = fecha_tecnomecanica && fecha_tecnomecanica
        usuario.fecha_obligatorio = fecha_obligatorio && fecha_obligatorio
        await usuario.save()
        return res.status(201).send(usuario)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Algo salió mal'
        })
    }
}

const deleteUsuario = async (req = request, res = response) => {
    try {
        await usuarios.destroy({
            where: {
                uuid: req.params.uuid
            }
        })

        return res.json({ message: 'Usuario Eliminado!' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Algo salió mal'
        })
    }
}

module.exports = {
    loginUser,
    getUsers,
    addUsuario,
    updateUsuario,
    deleteUsuario
}
