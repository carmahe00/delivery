"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class domicilios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ usuarios }) {
      this.belongsTo(usuarios, { foreignKey: "id_usuario", as: 'usuario' });
      this.belongsTo(usuarios, { foreignKey: "id_proveedor", as: 'proveedor' });
    }
  }
  domicilios.init(
    {
      id_pedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      fecha_hora: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn("NOW"),
      },
      recoger: {
        type: DataTypes.STRING(200),
        allowNull: false,
        defaultValue: "",
      },
      lat_recoger: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      lon_recoger: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      entregar: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lat_entregar: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      lon_entregar: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      tipo_vehiculo: {
        type: DataTypes.ENUM("MOTO", "PARTICULAR", "CAMION"),
        allowNull: false,
        defaultValue: "PARTICULAR",
      },
      celular: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      valor_pedido: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      asegurar: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      valor_seguro: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      valor_domicilio: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      comision: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      forma_pago: {
        type: DataTypes.ENUM("PAGO_TOTAL", "PAGA_ENVIA", "PAGA_RECIBE"),
        allowNull: false,
        defaultValue: "PAGA_RECIBE",
      },
      evidencia: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      estado: {
        type: DataTypes.ENUM(
          "BUSCANDO",
          "VA_RECOGER",
          "EN_CAMINO",
          "ENTREGADO",
          "ENTREGADO_CONFIRMADO",
          "ANULADO"
        ),
        allowNull: false,
        defaultValue: "BUSCANDO",
      },
      fecha_estado: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn("NOW"),
        onUpdate: sequelize.fn("NOW"),
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      estaborrado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      fecha_borrado: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn("NOW"),
        onUpdate: sequelize.fn("NOW"),
      },
      imagen: {
        type: DataTypes.STRING(200),
        defaultValue: null,
      },
      tipousuario: {
        type: DataTypes.ENUM([
          "GENERAL",
          "ESPECIAL",
        ]),
        allowNull: true,
        defaultValue: "GENERAL",
      },
      com_pro: {
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: null,
      },
      com_dom: {
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "domicilios",
      timestamps: false,
      tableName: "domicilios",
    }
  );
  return domicilios;
};
