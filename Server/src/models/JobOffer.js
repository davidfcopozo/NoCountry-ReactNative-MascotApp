const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  sequelize.define(
    "jobOffer",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      img: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      timestamps: false
    }
  );
};
