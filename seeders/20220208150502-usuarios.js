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
      id_ciudad:1,
      estado: 1,
    },
    {
      nombre: 'Juan',
      email: 'juan@example.com',
      clave: bcryptjs.hashSync('123456'),
      rol: ["DOMICILIARIOS"],
      direccion: "kra 2w 10",
      uuid: uuidv4(),
      celular: "3107899898",
      id_ciudad:2,
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
      id_ciudad:2,
      estado: 1, 
    },
    {
      nombre: 'user',
      email: 'user@example.com',
      clave: bcryptjs.hashSync('123456'),
      rol: ["PROVEEDORES"],
      direccion: "kra 2w 10",
      uuid: uuidv4(),
      celular: "3107899898",
      id_ciudad:3,
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
