"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("domicilios", {
      id_pedido: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fecha_hora: {
        type: Sequelize.DATE,
      },
      recoger: {
        type: Sequelize.STRING,
      },
      lat_recoger: {
        type: Sequelize.STRING,
      },
      lon_recoger: {
        type: Sequelize.STRING,
      },
      entregar: {
        type: Sequelize.STRING,
      },
      lat_entregar: {
        type: Sequelize.STRING,
      },
      lon_entregar: {
        type: Sequelize.STRING,
      },
      tipo_vehiculo: {
        type: Sequelize.ENUM("MOTO", "PARTICULAR", "CAMION"),
        allowNull: false,
        defaultValue: "PARTICULAR",
      },
      celular: {
        type: Sequelize.STRING,
      },
      nombre: {
        type: Sequelize.STRING,
      },
      valor_pedido: {
        type: Sequelize.DECIMAL,
      },
      asegurar: {
        type: Sequelize.INTEGER,
      },
      valor_seguro: {
        type: Sequelize.DECIMAL,
      },
      valor_domicilio: {
        type: Sequelize.DECIMAL,
      },
      comision: {
        type: Sequelize.DECIMAL,
      },
      forma_pago: {
        type: Sequelize.ENUM("PAGO_TOTA", "PAGA_ENVIA", "PAGA_RECIBE"),
        allowNull: false,
        defaultValue: "PAGA_RECIBE",
      },
      evidencia: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      estado: {
        type: Sequelize.ENUM(
          "BUSCANDO",
          "VA_RECOGER",
          "EN_CAMINO",
          "ENTREGADO",
          "ENTREGADO_CONFIRMADO",
          "ANULADO"
        ),
        allowNull: false,
        defaultValue: "BUSCANDO",
      },
      fecha_estado: {
        type: Sequelize.DATE,
      },
      descripcion: {
        type: Sequelize.STRING,
      },
      estaborrado: {
        type: Sequelize.INTEGER,
      },
      id_usuario: {
        type: Sequelize.INTEGER,
      },
      id_proveedor: {
        type: Sequelize.INTEGER,
      },

      fecha_borrado: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("domicilios");
  },
};
