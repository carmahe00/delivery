'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('v_saldos', {
      
      id_usuario: {
        type: Sequelize.INTEGER
      },
      saldo: {
        type: Sequelize.INTEGER
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('v_saldos');
  }
};