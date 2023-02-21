const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  sequelize.define(
    "request",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      hired_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        allowNul: false
      }
    },
    {
      timestamps: false
    }
  );
};
