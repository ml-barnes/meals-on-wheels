var express = require("express");
var router = express.Router();
const customerController = require("../controllers/customerController");
const foodController = require("../controllers/foodController");
const mealController = require("../controllers/mealController");
const extraController = require("../controllers/extraController");
const cycleController = require("../controllers/cycleController");

router.get("/", function(req, res) {
  res.send("See api docs at");
});

//Meals
router.post("/api/createMeal", mealController.createMeal);
router.get("/api/getMeals", mealController.getMeals);

//Food
router.post("/api/createFood", foodController.createFood);
router.get("/api/getFood", foodController.getFood);

//Cycle
router.get("/api/getCycles", cycleController.getCycles);
router.get("/api/getAllCycles", cycleController.getAllCycles);

//Extras
router.get("/api/getExtras", extraController.getExtras);
router.post("/api/createExtra", extraController.createExtra);

//Customers
router.get("/api/findCustomer", customerController.findCustomer);
router.get("/api/getCustomers", customerController.getCustomers);
router.get("/api/customersTest", customerController.customersTest);
router.post("/api/updateCustomer", customerController.updateCustomer);
router.post("/api/createCustomer", customerController.createCustomer);

module.exports = router;
