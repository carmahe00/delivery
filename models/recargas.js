"use strict";
const { Model } = require("sequelize");
const { Sequelize } = require(".");
module.exports = (sequelize, DataTypes) => {
  class recargas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ usuarios }) {
      this.belongsTo(usuarios, { foreignKey: "id_usuario", as: "usuario" });
    }
  }
  recargas.init(
    {
      id_recarga: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
        allowNull: false,
      },
      celular: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      tipo: {
        type: DataTypes.ENUM("NORMAL", "CORTESIA"),
        allowNull: false,
        defaultValue: "NORMAL",
      },
      valor: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "recargas",
      tableName: "recargas",
      timestamps: false,
    }
  );
  return recargas;
};
