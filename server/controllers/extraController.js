const Customer = require("../db/models").Customer;
const Extra = require("../db/models").Extra;
const Op = require("../db/models").Sequelize.Op;
const sequelize = require("../db/models").sequelize;
const moment = require("moment");
const jsonDiff = require("json-diff");

module.exports = {
  getExtras(req, res) {
    console.log(req);
    return Customer.findAll({
      where: {
        id: req.query.id
      },
      include: [Extra]
    })
      .then(extraData => {
        var keys = [];
        var differences = [];

        var extraMealData;
        var customerMealData;

        extraData = extraData[0];

        extraData.Extras.map((extra, index) => {
          keys.push({ index, dayIndex: extra.mealData.key });
        });

        keys.map(key => {
          extraMealData = extraData.Extras[key.index].mealData;
          customerMealData = extraData.mealData[key.dayIndex];

          var date = extraData.Extras[key.index].date;
          var difference = jsonDiff.diff(customerMealData, extraMealData);

          if (difference != null) {
            differences.push({
              difference,
              date
            });
          }
        });
        console.log(differences);
        res.status(200).send(differences);
      })
      .catch(error => {
        console.log(error);
        res.status(400).send(error);
      });
  },

  createExtra(req, res) {
    console.log(req.body);
    req.body.map(day => {
      day.date = moment(day.mealData.date).format("DD/MM/YY");
      delete day.mealData.date;
    });

    Promise.all(
      req.body.map(day => {
        return Extra.upsert(day)
          .then(extras => {
            return extras;
          })
          .catch(error => {
            return error;
          });
      })
    )
      .then(done => {
        res.status(200).send(done);
      })
      .catch(error => res.status(400).send(error));
  }
};
