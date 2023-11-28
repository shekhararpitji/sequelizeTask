'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Address, { as: 'addresses', foreignKey: 'userId' }); 
      User.hasMany(models.Token, { as: 'tokens', foreignKey: 'userId' });       }
     
  }
  User.init({
    firstName: DataTypes.STRING,
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};