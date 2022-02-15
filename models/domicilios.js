'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class domicilios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  domicilios.init({
    id_pedido: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    fecha_hora: {
      type: DataTypes.DATE,
      allowNull: false
    },
    recoger: {
      type: DataTypes.STRING(200),
      allowNull: false

    },
    lat_recoger: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lon_recoger: {
      type: DataTypes.STRING,
      allowNull: false
    },
    entregar: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat_entregar: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lon_entregar: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tipo_vehiculo: {
      type: DataTypes.ENUM(
        'MOTO', 'PARTICULAR', 'CAMION'
      ),
      allowNull: false,
      defaultValue: 'PARTICULAR'
    },
    celular: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    valor_pedido: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    asegurar: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    valor_seguro: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    valor_domicilio: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    comision: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    forma_pago: {
      type: DataTypes.ENUM(
        'PAGO_TOTA', 'PAGA_ENVIA', 'PAGA_RECIBE'
      ),
      allowNull: false,
      defaultValue: 'PAGA_RECIBE'
    },
    evidencia: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha_estado: {
      type: DataTypes.DATE,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estaborrado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha_borrado: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'domicilios',
    timestamps: false,
    tableName: 'domicilios'
  });
  return domicilios;
};