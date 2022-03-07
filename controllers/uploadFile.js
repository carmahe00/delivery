const fs = require('fs');
const { usuarios } = require('../models');
const { response, request } = require('express');

const fileUploadUsers = async (req = request, res = response) => {
    const { uuid } = req.params
    try {
        
        const usuario = await usuarios.findOne({
            where: {
                uuid: uuid,
            }
        })
        if (usuario.imagen)
            if (fs.existsSync(`./${usuario.imagen}`))
                fs.unlinkSync(`./${usuario.imagen}`);
        usuario.imagen = `/${req.file.path}`
        await usuario.save();
        console.log("Imagen nueva:", usuario)
        res.send(usuario);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Algo salió mal'
        })
    }
}


module.exports = {
    fileUploadUsers
}