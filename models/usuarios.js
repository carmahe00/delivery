'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON() {
      return { ...this.get(), clave: undefined, id_usuario: undefined }
    }
  };
  usuarios.init({
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    nombre: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: { msg: 'email es necesario' },
        notEmpty: { msg: 'email no puede estar vacio' },
        isEmail: { msg: 'Debe ser un correo valido' }
      }
    },
    clave: DataTypes.STRING,
    rol: {
      type: DataTypes.ENUM(
        ['ADMINISTRADOR', 'COORDINADOR', 'USUARIO', 'MENSAJERO']
      ),
      allowNull: false,
      defaultValue: ['MENSAJERO']
    },
    direccion: DataTypes.STRING,
    celular: DataTypes.STRING,
    estado: DataTypes.INTEGER,
    fecha_creado: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW'),
      onUpdate: sequelize.fn('NOW')

    },
    estadoborrado: DataTypes.INTEGER,
    fecha_borrador: DataTypes.DATE,
    imagen: {
      type: DataTypes.BLOB('long')
    }
  }, {
    sequelize,
    modelName: 'usuarios',
    tableName: 'usuarios',
    timestamps: false
  });
  return usuarios;
};