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
    static associate({ ciudades, domicilios }) {
      this.belongsTo(ciudades, { foreignKey: 'id_ciudad', as: 'ciudad' })
      this.hasMany(domicilios, { foreignKey: 'id_usuario' })
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
    obligatorio: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: false
    },
    tecnomecanica: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: false
    },
    placa: {
      type: DataTypes.STRING,
      defaultValue: "000-000",
      allowNull: false
    },
    tipo_vehiculo: {
      type: DataTypes.ENUM(
        'MOTO', 'PARTICULAR', 'CAMION'
      ),
      allowNull: false,
      defaultValue: 'PARTICULAR'
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
        ['ADMINISTRADOR', 'COORDINADOR', 'PROVEEDORES', 'DOMICILIARIOS']
      ),
      allowNull: false,
      defaultValue: ['DOMICILIARIOS']
    },
    direccion: DataTypes.STRING,
    celular: DataTypes.STRING,
    estado: DataTypes.INTEGER,
    fecha_creado: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW'),
      onUpdate: sequelize.fn('NOW')

    },
    fecha_obligatorio: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW'),
      onUpdate: sequelize.fn('NOW')
    },
    fecha_tecnomecanica: {
      type: DataTypes.DATE,
      defaultValue: null,

    },
    longitud: {
      type: DataTypes.DECIMAL(10, 5),
      defaultValue: null,

    },
    latitud: {
      type: DataTypes.DECIMAL(10, 5),
      defaultValue: null,

    },
    estadoborrado: DataTypes.INTEGER,
    fecha_borrador: DataTypes.DATE,
    imagen: {
      type: DataTypes.STRING(200),
      defaultValue: null,
    }
  }, {
    sequelize,
    modelName: 'usuarios',
    tableName: 'usuarios',
    timestamps: false
  });
  return usuarios;
};