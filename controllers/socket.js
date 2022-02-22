const {domicilios} = require('../models');
const { Op } = require("sequelize");

const grabarDomicilio = async(payload) =>{
    try {
        let isPreviewsDomocilio;
        const { 
            entregar,
            recoger,
            tipo_vehiculo,
            valor_domicilio,
            valor_pedido,
            asegurar,
            valor_seguro,
            evidencia,
            forma_pago,
            celular,
            nombre,
            descripcion
         } = payload
        isPreviewsDomocilio = payload?.id_pedido &&  await domicilios.findOne({
            where: {
                id_pedido: {
                    [Op.eq]: payload.id_pedido
                }
            }
        })
        if(isPreviewsDomocilio.estado !== "BUSCANDO")
            throw new Error("El pedido ya fue solicitado")
        if(isPreviewsDomocilio){
            isPreviewsDomocilio.entregar = entregar;
            isPreviewsDomocilio.recoger = recoger;
            isPreviewsDomocilio.tipo_vehiculo = tipo_vehiculo;
            isPreviewsDomocilio.valor_domicilio = valor_domicilio;
            isPreviewsDomocilio.valor_pedido = valor_pedido;
            isPreviewsDomocilio.asegurar = asegurar;
            isPreviewsDomocilio.valor_seguro = valor_seguro;
            isPreviewsDomocilio.evidencia = evidencia;
            isPreviewsDomocilio.forma_pago = forma_pago;
            isPreviewsDomocilio.celular = celular;
            isPreviewsDomocilio.nombre = nombre;
            isPreviewsDomocilio.descripcion = descripcion;
            return await isPreviewsDomocilio.save()
        }
        const solicitud = await domicilios.create(payload)
        return solicitud
    } catch (error) {
        return error
    }
}


module.exports = {
    grabarDomicilio
}
