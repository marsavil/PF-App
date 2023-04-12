const { DataTypes } = require("sequelize");

/* 
Shoppinghistory: relacion entre user id y product id,
Cart: relacion entre user id y product id

*/

module.exports = (sequelize) => {
  sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primarykey: true,
      validate: {
        isEmail: {
          msg: "Debe ser un email válido",
        },
      },
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
		code: {
			type: DataTypes.STRING,
			allowNull: false
		}
  });
};
