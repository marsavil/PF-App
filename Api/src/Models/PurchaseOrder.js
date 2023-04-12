const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("PurchaseOrder", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "Processing payment",
        "Preparing for shipping",
        "Sent",
        "Completed"
      ),
      defaultValue: "Processing payment",
    },
  });
};
