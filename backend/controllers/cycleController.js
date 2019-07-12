const Cycle = require("../db/models").Cycle;
const Meal = require("../db/models").Meal;
const Food = require("../db/models").Food;
const moment = require("moment");
const Op = require("../db/models").Sequelize.Op;

// There are 30 meals in a cycle, this doesn't include sundays.
// Therefore if we add sundays and don't include the last day,
// The number of days in a cycle is 36.
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
        console.log(
          "Cycle start",
          findCycleStart(moment("19/06/2019", "DD/MM/YYYY"))
        );
        res.status(200).send(getDates(cycle));
      })
      .catch(error => {
        console.log(error);
        res.status(400).send(error);
      });
  },

  updateCycles(req, res) {
    var meals = req.body;
    cycles = [];

    // Remove sundays which will be empty
    meals.splice(0, 0, null);
    meals.splice(7, 0, null);
    meals.splice(14, 0, null);
    meals.splice(21, 0, null);
    meals.splice(28, 0, null);

    meals.map((meal, index) => {
      if (meal != null) {
        cycles.push({ day: index, MealId: meal.id });
      }
    });

    Promise.all(
      cycles.map(cycle => {
        return Cycle.update(
          {
            MealId: cycle.MealId
          },
          {
            where: {
              day: cycle.day
            }
          }
        )
          .then(cycle => {
            return cycle;
          })
          .catch(error => {
            return error;
          });
      })
    )
      .then(done => {
        console.log(done);
        res.status(200).send(done);
      })
      .catch(error => res.status(400).send(error));
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
        console.log("Cycle start", findCycleStart(moment()));
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
              test: cycle,
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

// Gets each meal from cycle and assigns it a date.
// Currently only returns previous 30 meals and next 60
function getDates(cycle) {
  const startDate = findCycleStart(
    moment()
      .subtract(30, "d")
      .startOf("day")
  );
  const endDate = moment()
    .add(60, "d")
    .startOf("day");

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

// Finds the closest start date to passed in date
// For example, if passed in date was 20/05/19, the function will return the 06/05/19.
// If passed in date is 19/06/19, function will return 11/06/19,
// This is 36 days after the first cycle (The second cycle)
function findCycleStart(date) {
  var cycleStart = moment("06/05/2019", "DD/MM/YYYY");
  var daysBetween = date.diff(cycleStart, "d");
  var numberOfCycles = Math.floor(daysBetween / cycleSize);
  var newCycle = cycleStart.add(numberOfCycles * cycleSize, "d");

  return newCycle;
}

// The way the data is stored for meals isn't convenient for displaying in frontend.
// This function takes the db data and puts each meal into a nice object that is
// easy to map and display
function mapMeals(cycles) {
  var meals = cycles.map((meal, i) => {
    if (meal.Meal != null) {
      meal = meal.Meal;
    }

    if (meal == null) {
      return { day: i };
    }
    if (meal.Food == null) {
      return { day: i };
    }

    var Meat = meal.Food.filter(food => food.type == "Meat")[0];
    var Alternative = meal.Food.filter(food => food.type == "Alternative")[0];
    var Vegetarian = meal.Food.filter(food => food.type == "Vegetarian")[0];
    var Dessert = meal.Food.filter(food => food.type == "Dessert")[0];
    var Soup = meal.Food.filter(food => food.type == "Soup")[0];
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
      Vegetables: Vegetables ? Vegetables.slice(0, -2) : ""
    };
  });

  return meals;
}
