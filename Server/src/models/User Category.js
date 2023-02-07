const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define ('user_category',{
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         autoIncrement: true,
         primaryKey: true,
      },
      user_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      category_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
   });
}