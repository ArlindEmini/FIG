const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Clients = sequelize.define("Clients", {
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  client_type: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  created_date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Clients;
