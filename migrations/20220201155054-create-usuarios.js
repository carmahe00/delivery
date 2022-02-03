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
      rol: {
        type: Sequelize.ENUM(
          ['ADMINISTRADOR', 'COORDINADOR', 'USUARIO', 'MENSAJERO']
        )
      },
      direccion: {
        type: Sequelize.STRING
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
        type: Sequelize.BLOB('long')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('usuarios');
  }
};