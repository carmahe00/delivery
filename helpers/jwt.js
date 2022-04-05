const jwt = require('jsonwebtoken');

/**
 * método para generar un token
 * @returns Promise con el token o error
 */
const generarJWT = (uuid, username) => {
    return new Promise((resolve, reject) => {
        //cuerpo del token
        const payload = {
            uuid,
            username
        }
        jwt.sign(payload, process.env.JWT_SECRET, {
            
        }, (err, token) => {
            if (err)
                reject('No se pudo generar el token');
            else
                resolve(token)
        });
    });
}

const comprobarJWT = (token = '') => {
    try {
        const { uuid } = jwt.verify(token, process.env.JWT_KEY)
        console.log('uuid:', uuid)
        return [true, uuid]
    } catch (error) {
        console.log(error)
        return [false, null]
    }
}

module.exports = {
    generarJWT,
    comprobarJWT
}