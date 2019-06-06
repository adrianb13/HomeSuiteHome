module.exports = function(sequelize, DataTypes) {
  var Lease = sequelize.define("Lease", {
    leaseType: {
      type: DataTypes.STRING,
    },
    leaseStartDate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    leaseEndDate: {
      type: DataTypes.STRING
    },
    rentalRate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    securityDeposit: {
      type: DataTypes.DECIMAL(10,2),
      default: 0
    },
    lateFee: {
      type: DataTypes.DECIMAL(10,2),
      default: 0
    },
    nsfFee: {
      type: DataTypes.DECIMAL(10,2),
      default: 0
    },
    RentalPropertyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isActive: {
      // false=Inactive;
      // true=Active;
      type: DataTypes.BOOLEAN,
      default: true
    }
  });

  Lease.associate = function(models) {
    Lease.belongsToMany(models.RentalProperty, {through: 'LeaseRentalProperty'})
    Lease.belongsTo(models.User);
    //Lease.hasMany(models.LeaseRentalProperty);
  };

  return Lease;
};