const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("ShippingAddress", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    
    street: {
      type: DataTypes.STRING,
    },
    number: {
      type: DataTypes.INTEGER,
    },
    postalCode: {
      type: DataTypes.INTEGER,
    },
    apartment: {
      type: DataTypes.STRING,
    },
    floor: {
      type: DataTypes.INTEGER,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
  });
};
