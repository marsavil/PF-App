const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("ShoppingCart", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    
    
    }) 
}