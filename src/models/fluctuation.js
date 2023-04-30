'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fluctuations extends Model {
    static associate(models) {
      Fluctuations.belongsTo(models.User, {foreignKey: "userId", targetKey: "id", as: "userData"})
      Fluctuations.belongsTo(models.Category, {foreignKey: "categoryId", targetKey: "id", as: "categoryData"})
    }
  }

  Fluctuations.init({
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    amountMoney: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Fluctuation',
  });
  return Fluctuations;
};