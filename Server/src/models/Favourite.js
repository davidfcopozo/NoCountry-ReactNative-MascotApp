const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  sequelize.define(
    "favourite",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      fav_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      user_id_favs: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: true
    }
  );
};
