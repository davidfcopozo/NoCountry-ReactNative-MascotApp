module.exports = sequelize => {
  sequelize.define(
    "Pet_Request",
    {},
    {
      timestamps: false
    }
  );
};
