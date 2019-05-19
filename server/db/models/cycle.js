// Example code for how models should be structured

module.exports = function(sequelize, Sequelize) {
  var Cycle = sequelize.define(
    "Cycle",
    {
      day: {
        type: Sequelize.INTEGER,
        primaryKey: true
      }
    },
    {}
  );

  Cycle.associate = models => {
    Cycle.belongsTo(models.Meal);
  };

  return Cycle;
};
