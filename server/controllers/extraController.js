const Customer = require("../db/models").Customer;
const Extra = require("../db/models").Extra;
const Op = require("../db/models").Sequelize.Op;
const sequelize = require("../db/models").sequelize;
const moment = require("moment");
const jsonDiff = require("json-diff");

module.exports = {
  // Compares the extra (Meal add on) with the normal meal of that day.
  // Returns any differences between them.
  // JSON diff dependency has some stupid bugs I had to account for
  getExtras(req, res) {
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
          let difference = jsonDiff.diff(customerMealData, extraMealData);
          let deleteIndex = null;

          if (difference !== null && difference !== undefined) {
            // jsonDiff sometimes returns an array of [[' ']]
            // Need to remove this. Can't use filter as it removes extras key.

            if (difference.extras) {
              difference.extras.map((outer, index) => {
                outer.map(inner => {
                  if (inner === " ") {
                    deleteIndex = index;
                  }
                });
              });
              deleteIndex !== null && difference.extras.splice(deleteIndex, 1);
              deleteIndex = null;
            }

            differences.push({
              originalExtras: customerMealData.extras,
              difference,
              date
            });
          }
        });
        res.status(200).send(differences);
      })
      .catch(error => {
        console.log(error);
        res.status(400).send(error);
      });
  },

  // If multiple extras are passed in it updates them all.
  // Uses upsert which inserts a new row if doesn't exist,
  // Or updates if does exist
  createExtra(req, res) {
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
