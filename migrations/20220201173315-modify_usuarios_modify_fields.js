'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return Promise.all([
      queryInterface.changeColumn(
        "usuarios",
        "rol",
        {
          type: Sequelize.ENUM(
            ['ADMINISTRADOR', 'COORDINADOR', 'PROVEEDORES', 'DOMICILIARIOS']
          ),
          allowNull: false,
          defaultValue: ['DOMICILIARIOS']
        }
      ),
      queryInterface.addColumn(
        'usuarios', // table name
        'uuid', // new field name
        {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
      ),
      
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn('usuarios', 'rol'),

    ]);
  }
};
