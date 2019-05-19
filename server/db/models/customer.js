// Example code for how models should be structured

module.exports = function(sequelize, Sequelize) {
  var Customer = sequelize.define(
    "Customer",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      detailData: {
        type: Sequelize.JSONB
      },
      mealData: {
        type: Sequelize.JSONB
      },
      restrictionData: {
        type: Sequelize.JSONB
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

  return Customer;
};
