module.exports = function(sequelize, DataTypes) {
    var UserRentalProperty = sequelize.define("UserRentalProperty", {
      userRole: {
        type: DataTypes.STRING
      }
    }, { sequelize, modelName: 'UserRentalProperty', freezeTableName: true });
  
    return UserRentalProperty;
  };