const Food = require("../db/models").Food;

module.exports = {
  createFood(req, res) {
    return Food.create(req.body)
      .then(food => {
        console.log(food);
        res.status(200).send(food);
      })
      .catch(error => {
        console.log(error);
        res.status(400).send(error);
      });
  },
  getFood(req, res) {
    return Food.findAll()
      .then(food => {
        console.log(food);
        res.status(200).send(food);
      })
      .catch(error => {
        console.log(error);
        res.status(400).send(error);
      });
  }
};
