const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  sequelize.define("request", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    hired_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pet_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cateogry_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNul: false
    }
  });
};
