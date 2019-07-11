var express = require("express");
var router = express.Router();
const customerController = require("../controllers/customerController");
const foodController = require("../controllers/foodController");
const mealController = require("../controllers/mealController");
const extraController = require("../controllers/extraController");
const cycleController = require("../controllers/cycleController");
const driverController = require("../controllers/driverController");
const clusterController = require("../controllers/clusterController");
const userController = require("../controllers/userController");
const withAuth = require("./middleware");

router.get("/", function(req, res) {
  res.send("See api docs at");
});

//User
router.get("/api/getUser", withAuth, userController.getUser);
router.post("/api/registerUser", userController.registerUser);
router.post("/api/authenticateUser", userController.authenticateUser);
router.get("/api/checkToken", withAuth, withAuth, userController.checkToken);
router.get("/api/removeToken", withAuth, userController.removeToken);

//Meals
router.post("/api/createMeal", withAuth, mealController.createMeal);
router.get("/api/getMeals", withAuth, mealController.getMeals);
router.post("/api/deleteMeal", withAuth, mealController.deleteMeal);

//Food
router.post("/api/createFood", withAuth, foodController.createFood);
router.get("/api/getFood", withAuth, foodController.getFood);

//Cycle
router.get("/api/getCycles", withAuth, cycleController.getCycles);
router.get("/api/getAllCycles", withAuth, cycleController.getAllCycles);
router.post("/api/updateCycles", withAuth, cycleController.updateCycles);

//Extras
router.get("/api/getExtras", withAuth, extraController.getExtras);
router.post("/api/createExtra", withAuth, extraController.createExtra);

//Customers
router.get("/api/findCustomer", withAuth, customerController.findCustomer);

router.get("/api/getCustomers", withAuth, customerController.getCustomers);
router.get("/api/customersTest", withAuth, customerController.customersTest);
router.post(
  "/api/updateCustomerActive",
  customerController.updateCustomerActive
);
router.post("/api/updateCustomer", withAuth, customerController.updateCustomer);
router.post("/api/createCustomer", withAuth, customerController.createCustomer);

// Drivers
router.post("/api/createDriver", driverController.createDriver);
router.get("/api/driversList", driverController.retrieveDrivers);
router.get("/api/findDriver", driverController.findDriver);
router.post("/api/createDriverDays", driverController.createDriverDays);
router.get("/api/getDriverDays", driverController.getDriverDays);

// Clusters
router.post("/api/createCluster", clusterController.createCluster);
router.get("/api/getClusters", clusterController.getClusters);

module.exports = router;
