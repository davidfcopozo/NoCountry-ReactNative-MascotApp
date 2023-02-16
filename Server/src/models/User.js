const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  sequelize.define(
    "user",
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
      surname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      offers_services: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      profile_pic: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      timestamps: false
    }
  );
};
