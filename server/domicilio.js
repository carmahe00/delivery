class Domicilio {
    constructor(estado, uuid, id_pedido){
        this.uuid = uuid
        this.id_pedido = id_pedido
        this.estado = estado
    }
}

module.exports = Domicilio