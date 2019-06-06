module.exports = (sequelize, DataTypes) => {
  let WorkOrder = sequelize.define("WorkOrder", {
    workOrderName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    workOrderType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    workOrderPriority: {
      type: DataTypes.STRING,
      default: "1 (Low)"
    },
    workOrderDescription: {
      type: DataTypes.STRING,
      allowNull: false
    },
    incidentDate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    workOrderPrice: {
      type: DataTypes.DECIMAL,
      default: 0
    },
    workOrderStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      default: "Waiting Approval"
    },
    RentalPropertyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })

  WorkOrder.associate = function(models) {
    WorkOrder.belongsTo(models.RentalProperty);
  };

  return WorkOrder;

}
