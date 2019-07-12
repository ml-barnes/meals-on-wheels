const Cluster = require("../db/models").Cluster;
const Customer = require("../db/models").Customer;
const Op = require("../db/models").Sequelize.Op;

module.exports = {
    createCluster(req, res) {
        console.log(req.body)
        return Cluster.create(req.body)
            .then(newCluster => {
                console.log("newClusters's being entered into the table!");
            })
            .then(newCluster => res.status(200).send(newCluster))
            .catch(error => {
                res.status(400).send(error);
            });
    },

    getClusters(req, res) {
        console.log(Cluster);
        return Cluster.findAll({
            model: Cluster,
            include: [Customer],
        }).then(cluster => {
            console.log(cluster);

            Cluster.findAll({
                where: {
                    id: {
                        [Op.In]: cluster.map(cluster => {
                            return cluster.customerID;
                        })
                    },

                    include: [Cluster]
                }
            }).then(clusters => {
                res.status(200).send(clusters)
            }).catch(error => {
                res.status(400).send(error);
            });
        }).catch(error => {
            res.status(400).send(error);
        });
    },

    getCustomersWithMeals() {
        return Customer.findAll({
            include: [Extra]
        })
            .then(customers => {
                let date = moment(req.query.date);
                const customerList = customers.filter(customer => {
                    customer.mealData.some(day => { day.display === date.day() && day.quantity > 0 })
                })
            }).then(res.status(200).send(customerList))
            .catch(error => {
                res.status(400).send(error);
            })
    }
};
