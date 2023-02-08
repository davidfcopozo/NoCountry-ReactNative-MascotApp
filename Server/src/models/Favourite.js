const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define ('favourite',{
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
      fav_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
   });
}