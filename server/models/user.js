'use strict';
const hashPass = require('../helper/hashPassword')
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
      // define association here
    }
  };
  User.init({
    email:{
      type:  DataTypes.STRING,
      validate:{
        isEmail:{
          msg:"invalid email format"
        }
      }
    },
    password:{
      type:  DataTypes.STRING,
      validate:{
        len:{
          args: [6],
          msg:"Minimal password 6 characters"
        }
      }
    }
  }, {hooks:{
    beforeCreate: (user, options)=>{
      user.password = hashPass(user.password)
    }
  },
    sequelize,
    modelName: 'User',
  });
  return User;
};