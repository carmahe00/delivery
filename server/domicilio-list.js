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
    if (!this.usuarios.find((usuarioTmp) => usuario.uuid === usuarioTmp.uuid))
      this.usuarios.push(usuario);
  }

  agregarDomicilios(domicilio) {
    this.domicilios.push(domicilio);
  }

  verificarActivo(uuid) {
    return !!this.asignados.find((asignado) => asignado.uuid === uuid);
  }

  asignarDomicilio(uuid, id_domicilio, estado) {
    const domicilio = new Domicilio(estado, uuid, id_domicilio);
    this.asignados.push(domicilio);
    return this.asignados;
  }
}

module.exports = DomicilioList;
