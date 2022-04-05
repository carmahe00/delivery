"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class v_saldo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ usuarios }) {
      this.belongsTo(usuarios, { foreignKey: "id_usuario" });
    }
  }
  v_saldo.init(
    {
      saldo: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "v_saldo",
      tableName: "v_saldo",
      timestamps: false,
    }
  );
  v_saldo.removeAttribute("id")
  return v_saldo;
};
