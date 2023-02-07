const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define ('user_review',{
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
      review_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
   });
}  