const Cycle = require("../db/models").Cycle;
const Meal = require("../db/models").Meal;
const Food = require("../db/models").Food;
const moment = require("moment");
const Op = require("../db/models").Sequelize.Op;
const cycleSize = 36;
const sundayNumber = 99999;

module.exports = {
  getCycles(req, res) {
    return Cycle.findAll({
      include: [
        {
          model: Meal,
          include: [Food]
        }
      ]
    })
      .then(cycle => {
        console.log(cycle);
        res.status(200).send(getDates(cycle));
      })
      .catch(error => {
        console.log(error);
        res.status(400).send(error);
      });
  },

  getAllCycles(req, res) {
    return Cycle.findAll({
      include: [
        {
          model: Meal,
          include: [Food]
        }
      ],
      order: [["day", "ASC"]]
    })
      .then(cycle => {
        //console.log(cycle);
        Meal.findAll({
          where: {
            id: {
              [Op.notIn]: cycle.map(cycle => {
                return cycle.MealId;
              })
            }
          },
          include: [Food]
        })
          .then(excludedMeals => {
            res.status(200).send({
              Cycles: mapMeals(cycle),
              ExcludedMeals: mapMeals(excludedMeals)
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
  }
};

function getDates(cycle) {
  const startDate = findCycleStart(moment("06/06/2019", "DD/MM/YYYY"));

  const endDate = moment("20/06/19", "DD/MM/YY").add(1, "d");

  var date = startDate;
  var day = 1;
  var meals = [];

  while (!date.isSame(endDate)) {
    if (day == 0) {
      day = 1;
    }
    var currentCycle = cycle.filter(cycle => {
      return cycle.dataValues.day == day && day % 7 != 0;
    });

    if (currentCycle.length > 0) {
      meals.push({
        cycle: currentCycle[0],
        date: date.format("DD/MM/YY")
      });
    }

    date = date.add(1, "d");

    day = (day + 1) % cycleSize;
  }

  return meals;
}

function findCycleStart(date) {
  var cycleStart = moment("06/05/2019", "DD/MM/YYYY");
  var daysBetween = date.diff(cycleStart, "d");
  var numberOfCycles = Math.floor(daysBetween / cycleSize);
  var newCycle = cycleStart.add(numberOfCycles * cycleSize, "d");

  return newCycle;
}

function mapMeals(cycles) {
  var meals = cycles.map((meal, i) => {
    if (meal.Meal != null) {
      meal = meal.Meal;
    }

    if (meal != null) {
      var Meat = meal.Food.filter(food => food.type == "Meat")[0];
      var Alternative = meal.Food.filter(food => food.type == "Alternative")[0];
      var Vegetarian = meal.Food.filter(food => food.type == "Vegetarian")[0];
      var Dessert = meal.Food.filter(food => food.type == "Dessert")[0];
      var Soup = meal.Food.filter(food => food.type == "Soup")[0];
      var Fruit = meal.Food.filter(food => food.type == "Fruit")[0];
      var Sandwich = meal.Food.filter(food => food.type == "Sandwich")[0];
      var Vegetables = "";
      meal.Food.filter(food => food.type == "Vegetable").map(vege => {
        Vegetables += vege.name + ", ";
      });

      return {
        day: i,
        id: meal.id,
        Meat: Meat ? Meat.dataValues.name : "",
        Alternative: Alternative ? Alternative.dataValues.name : "",
        Vegetarian: Vegetarian ? Vegetarian.dataValues.name : "",
        Dessert: Dessert ? Dessert.dataValues.name : "",
        Soup: Soup ? Soup.dataValues.name : "",
        Fruit: Fruit ? Fruit.dataValues.name : "",
        Sandwich: Sandwich ? Sandwich.dataValues.name : "",
        Vegetables: Vegetables.slice(0, -2)
      };
    }
  });

  return meals;
}
