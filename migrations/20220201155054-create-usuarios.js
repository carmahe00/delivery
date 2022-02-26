'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuarios', {
      id_usuario: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      clave: {
        type: Sequelize.STRING
      },
      obligatorio: {
        type: Sequelize.STRING,
        defaultValue: '',
        allowNull: false
      },
      tecnomecanica: {
        type: Sequelize.STRING,
        defaultValue: '',
        allowNull: false
      },
      placa: {
        type: Sequelize.STRING,
        defaultValue: "000-000",
        allowNull: false
      },
      rol: {
        type: Sequelize.ENUM(
          ['ADMINISTRADOR', 'COORDINADOR', 'PROVEEDORES', 'DOMICILIARIOS']
        )
      },
      tipo_vehiculo: {
        type: Sequelize.ENUM(
          'MOTO', 'PARTICULAR', 'CAMION'
        ),
        defaultValue: "PARTICULAR",
      },
      id_ciudad: {
        type: Sequelize.INTEGER
      },
      fecha_tecnomecanica: {
        type: Sequelize.DATE,
        defaultValue: null,

      },
      longitud: {
        type: Sequelize.DECIMAL(10, 5),
        defaultValue: null,

      },
      latitud: {
        type: Sequelize.DECIMAL(10, 5),
        defaultValue: null,

      },
      direccion: {
        type: Sequelize.STRING
      },
      fecha_obligatorio: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      celular: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.INTEGER
      },
      fecha_creado: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      estadoborrado: {
        type: Sequelize.INTEGER
      },
      fecha_borrador: {
        type: Sequelize.DATE
      },
      imagen: {
        type: Sequelize.STRING(200),
        defaultValue: null,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('usuarios');
  }
};