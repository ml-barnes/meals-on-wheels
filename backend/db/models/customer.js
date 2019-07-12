// Example code for how models should be structured

module.exports = function (sequelize, Sequelize) {
  var Customer = sequelize.define(
    "Customer",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      detailData: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      mealData: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      restrictionData: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    },
    {
      // options
    }
  );

  Customer.associate = models => {
    Customer.hasMany(models.Extra);
  }; // Creates a second attribute - CustomerId

  // Creates a FOREIGN KEY reference between the DriverDelivery and Customer tables
  /*Customer.associate = models => {
    Customer.hasMany(models.Cluster, { foreignKey: 'customerID', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  };*/

  return Customer;
};
