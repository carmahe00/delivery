"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("recargas", {
      id_recarga: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fecha: {
        type: Sequelize.DATE,
      },
      celular: {
        type: Sequelize.STRING,
      },
      tipo: {
        type: Sequelize.ENUM("NORMAL", "CORTESIA"),
        allowNull: false,
        defaultValue: "NORMAL",
      },
      valor: {
        type: Sequelize.INTEGER,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("recargas");
  },
};
