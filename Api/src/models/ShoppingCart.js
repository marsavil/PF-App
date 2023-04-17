const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("ShoppingCart", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        quantity:{
            type: DataTypes.INTEGER,
        },
        totalPrice:{
            type: DataTypes.FLOAT,
            allowNull: false
        },

    })
}