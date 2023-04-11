const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("UserData", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cellphone:{
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        password:{
            //encriptar
            type: DataTypes.STRING,
            allowNull: false,
        },
        street:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        number:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        postalCode:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        apartment:{
            type: DataTypes.STRING,

        },
        floor:{
            type: DataTypes.INTEGER,
            
        },
        city:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        state:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        country:{
            type: DataTypes.STRING,
            allowNull: false,
        }


    })
}