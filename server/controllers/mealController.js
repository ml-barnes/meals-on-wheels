const Meal = require("../db/models").Meal;
const Food = require("../db/models").Food;
const Op = require("../db/models").Sequelize.Op;

module.exports = {
  getMeals(req, res) {
    return Meal.findAll({
      include: [
        {
          model: Food
        }
      ]
    })
      .then(meals => {
        res.status(200).send(meals);
      })
      .catch(error => {
        console.log(error);
        res.status(400).send(error);
      });
  },

  createMeal(req, res) {
    Food.findAll({
      where: {
        [Op.or]: req.body
      }
    })
      .then(food => {
        Meal.create()
          .then(meal => {
            meal.addFood(food).then(mealFood => {
              var data = {
                Meal: meal,
                Food: mealFood
              };
              res.status(200).send(data);
            });
          })
          .catch(error => {
            console.log(error);
            res.status(400).send(error);
          });
      })
      .catch(error => {
        console.log(error);
        res.status(400).send(error);
      });
  },

  deleteMeal(req, res) {
    return Meal.find({
      where: {
        id: req.body.id
      }
    })
      .then(meal => {
        meal.destroy().then(meal => res.status(200).send(meal));
      })
      .catch(error => {
        console.log(error);
        res.status(400).send(error);
      });
  }
};
