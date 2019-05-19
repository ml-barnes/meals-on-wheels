// Example code for how models should be structured

module.exports = function(sequelize, Sequelize) {
  var Food = sequelize.define(
    "Food",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.ENUM(
          "Meat",
          "Vegetable",
          "Vegetarian",
          "Soup",
          "Alternative",
          "Fruit",
          "Sandwich",
          "Dessert"
        )
      }
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["name", "type"]
        }
      ]
    }
  );

  Food.associate = models => {
    Food.belongsToMany(models.Meal, {
      through: "FoodMeal"
    });
  };

  return Food;
};
