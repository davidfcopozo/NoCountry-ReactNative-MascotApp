const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  sequelize.define("userPetType", {
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
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
};
