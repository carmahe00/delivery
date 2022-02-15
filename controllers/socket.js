const {domicilios} = require('../models');


const grabarDomicilio = async(payload) =>{
    try {
        const solicitud = await domicilios.create(payload)
        return solicitud
    } catch (error) {
        console.log(error)
        return error
    }
}


module.exports = {
    grabarDomicilio
}
