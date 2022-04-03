const {  DataTypes } = require('sequelize');
const sequelize = require('../config/database');

    const Users = sequelize.define("Users", {
        fullName:{
            type : DataTypes.STRING,
            allowNull : false,
            validate:{
                notEmpty:true
            }
        },
        password:{
            type : DataTypes.STRING,
            allowNull : false,
            validate:{
                notEmpty:true
            }
        }
    })

    module.exports = Users

  
