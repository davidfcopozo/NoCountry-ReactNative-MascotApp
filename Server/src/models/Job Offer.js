const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  sequelize.define("jobOffer", {
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
    name: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.INTEGER,
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
  });
};
