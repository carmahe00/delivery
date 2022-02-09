'use strict';
const bcryptjs = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ciudades', [{
      nombre: 'Medellin',
      
    },
    {
      nombre: 'Bucaramanga',
      
    },
    {
      nombre: 'Bogota',
      
    },
    {
      nombre: 'Cartagena',
      
    
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
