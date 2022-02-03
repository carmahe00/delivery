'use strict';
const bcryptjs = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('usuarios', [{
      nombre: 'John',
      email: 'example@example.com',
      clave: bcryptjs.hashSync('123456'),
      rol: ["ADMINISTRADOR"],
      direccion: "kra 2w 10",
      uuid: uuidv4(),
      celular: "3107899898",
      estado: 1,
      
    },
    {
      nombre: 'Juan',
      email: 'juan@example.com',
      clave: bcryptjs.hashSync('123456'),
      rol: ["MENSAJERO"],
      direccion: "kra 2w 10",
      uuid: uuidv4(),
      celular: "3107899898",
      estado: 1, 
    },
    {
      nombre: 'Freddy',
      email: 'freddy@example.com',
      clave: bcryptjs.hashSync('123456'),
      rol: ["COORDINADOR"],
      direccion: "kra 2w 10",
      uuid: uuidv4(),
      celular: "3107899898",
      estado: 1, 
    },
    {
      nombre: 'user',
      email: 'user@example.com',
      clave: bcryptjs.hashSync('123456'),
      rol: ["USUARIO"],
      direccion: "kra 2w 10",
      uuid: uuidv4(),
      celular: "3107899898",
      estado: 1, 
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
