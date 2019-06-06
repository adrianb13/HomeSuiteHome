module.exports = function(sequelize, DataTypes) {
  var RentalProperty = sequelize.define("RentalProperty", {
    rentalPropertyType: {
      // 0= residential
      // 1= commercial
      type: DataTypes.ENUM,
      values: ['residential','commercial']
    },
    streetNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    streetName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    unitNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cityName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stateCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2]
      }
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5]
      }
    },
    email: {
      type: DataTypes.STRING,
//      allowNull: false
      validate: {
        isEmail: true
      }
    },
    imageLink: {
      type: DataTypes.STRING
    },
    isActive: {
      // false=Inactive;
      // true=Active;
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: true
    }
  });

  RentalProperty.associate = function(models) {
    RentalProperty.belongsToMany(models.Lease, {through: 'LeaseRentalProperty'})
    //RentalProperty.hasMany(models.LeaseRentalProperty);
    
    RentalProperty.belongsToMany(models.User, {through: 'UserRentalProperty'})
    //RentalProperty.hasMany(models.UserRentalProperty);
    
    RentalProperty.hasMany(models.WorkOrder);
  };

  return RentalProperty;
};
