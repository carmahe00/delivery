const Domicilio = require("./domicilio");

class DomicilioList {
  constructor() {
    this.usuarios = [];
    this.domicilios = [];
    this.asignados = [];
  }

  get ultmosUsuarios10() {
    return this.domicilios.slice(0, 10);
  }

  agregarUsuario(usuario) {
    if (!this.usuarios.find((usuarioTmp) => usuario.device === usuarioTmp.device))
      this.usuarios.push(usuario);
  }

  agregarDomicilios(domicilio) {
    this.domicilios.push(domicilio);
  }

  asignarDomicilio(uuid, id_domicilio, estado) {
    const domicilio = new Domicilio(estado, uuid, id_domicilio);
    this.asignados.push(domicilio);
    return this.asignados;
  }

  getToken(nombre, rol, tipousuario) {
    if (tipousuario === "GENERAL")
      return this.usuarios
        .filter((usuario) => usuario.rol === rol && usuario.nombre === nombre)
        .map((usuario) => usuario.device);
    else
      return this.usuarios
        .filter(
          (usuario) =>
            usuario.rol === rol &&
            usuario.nombre === nombre &&
            usuario.tipousuario === tipousuario
        )
        .map((usuario) => usuario.device);
  }

  removerDomicilio(uuid, id_domicilio) {
    this.asignados = this.asignados.filter(
      (asignado) =>
        asignado.uuid !== uuid && asignado.id_pedido !== id_domicilio
    );
  }
}

module.exports = DomicilioList;
