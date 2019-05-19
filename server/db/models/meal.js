// Example code for how models should be structured

module.exports = function(sequelize, Sequelize) {
  var Meal = sequelize.define(
    "Meal",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }
    },
    {
      // options
    }
  );

  Meal.associate = models => {
    Meal.belongsToMany(models.Food, { through: "FoodMeal" });
  };

  return Meal;
};
