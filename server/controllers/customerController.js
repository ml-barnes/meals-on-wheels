const Customer = require("../db/models").Customer;
const Extra = require("../db/models").Extra;

module.exports = {
  getCustomers(req, res) {
    return Customer.findAll({
      //include: [Extra]
    })
      .then(customers => res.status(200).send(customers))
      .catch(error => {
        res.status(400).send(error);
      });
  },

  updateCustomerActive(req, res) {
    return Customer.find({
      where: {
        id: req.body.id
      }
    })
      .then(customer => {
        customer.active = !customer.active;
        customer.save().then(customer => {
          res.status(200).send(customer);
        });
      })
      .catch(error => {
        res.status(400).send(error);
      });
  },

  updateCustomer(req, res) {
    return Customer.update(
      {
        mealData: req.body.data.mealData,
        restrictionData: req.body.data.restrictionData,
        detailData: req.body.data.detailData
      },
      {
        where: {
          id: req.body.id
        }
      }
    )
      .then(customers => res.status(200).send(customers))
      .catch(error => {
        res.status(400).send(error);
      });
  },

  findCustomer(req, res) {
    return Customer.find({
      where: {
        id: req.query.id
      }
    })
      .then(customers => res.status(200).send(customers))
      .catch(error => {
        res.status(400).send(error);
      });
  },

  customersTest(req, res) {
    return Customer.findAll({
      where: {
        extras: {
          [Op.gt]: 1
        }
      }
    })
      .then(data => res.status(200).send(data))
      .catch(error => {
        res.status(400).send(error);
      });
  },
  createCustomer(req, res) {
    return Customer.create(req.body)
      .then(newCustomer => res.status(200).send(newCustomer))
      .catch(error => {
        res.status(400).send(error);
      });
  }
};
