const {  DataTypes } = require('sequelize');
const sequelize = require('../config/database');

    const Users = sequelize.define("Users", {
        full_name:{
            type : DataTypes.STRING,
            allowNull : false,
            validate:{
                notEmpty:true
            }
        },
        email:{
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
        },
        user_type:{
            type : DataTypes.SMALLINT,
            allowNull : false,
            validate:{
                notEmpty:true
            }
        },
        contact:{
            type : DataTypes.STRING,
            allowNull : false,
            validate:{
                notEmpty:true
            }
        },
        created_date:{
            type : DataTypes.DATE,
            allowNull : false,
            validate:{
                notEmpty:true
            }
        },
        qr_code:{
            type : DataTypes.STRING,
            allowNull : false,
            validate:{
                notEmpty:true
            }
        },
        timeoff_available:{
            type : DataTypes.STRING,
            allowNull : false,
            validate:{
                notEmpty:true
            }
        },
        createdAt:{
            type : DataTypes.DATE,
            allowNull : false,
            validate:{
                notEmpty:true
            }
        },
        updatedAt:{
            type : DataTypes.DATE,
            allowNull : false,
            validate:{
                notEmpty:true
            }
        },

    })

    module.exports = Users

  
