module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
/*     id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }, */
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone1: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [12]
      }
    },
    phone2: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [12]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
/*     nickname: {
      type: DataTypes.STRING,
      allowNull: true
    }, */
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8,20]
      }
    },
    isActive: {
      // false=Inactive;
      // true=Active;
      type: DataTypes.BOOLEAN,
      default: true
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    lastPasswordChangeDate: {
      type: DataTypes.DATE,
      default: Date.now()
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Lease);
    User.belongsToMany(models.RentalProperty, {through: 'UserRentalProperty'});
    //User.hasMany(models.UserRentalProperty);
  };

  return User;
};
