const { request, response } = require('express');
const { ciudades } = require('../models');

const getCiudades = async (req = request, res = response) => {
    try {
        const Ciudades = await ciudades.findAll()
        return res.send(Ciudades)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Algo salió mal'
        })
    }
}

const addCiudades = async (req = request, res = response) => {
    try {
        const ciudad = await ciudades.create(req.body)
        return res.status(201).send(ciudad)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Algo salió mal'
        })
    }
}

const updateCiudades = async (req= request, res= response) => {
    try {
        const { nombre } = req.body
        const ciudad = await ciudades.findOne({
            where: {
                id_ciudad: req.params.id
            }
        })
        ciudad.nombre = nombre;
        await ciudad.save()
        
        return res.status(201).send(ciudad)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Algo salió mal'
        })
    }
}

const deleteCiudad = async (req= request, res=response) => {
    try {
        await ciudades.destroy({
            where: {
                id_ciudad: req.params.id
            }
        })
        
        return res.json({ message: 'Ciudad Eliminada!' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Algo salió mal'
        })
    }
}

module.exports = {
    getCiudades,
    addCiudades,
    updateCiudades,
    deleteCiudad
}
