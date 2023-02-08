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
      job_offer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        allowNul: false
      }
    },
    {
      timestamps: false // ↖ acá deberíamos ver si podemos usar el timestamp de createdAt para el date de arriba ↖
    }
  );
};
