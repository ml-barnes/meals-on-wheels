const Driver = require("../db/models").Driver;
const DriverDay = require("../db/models").DriverDay;

module.exports = {
    retrieveDrivers(req, res) {
        return Driver.findAll({

        })
            .then(drivers => res.status(200).send(drivers))
            .catch(error => {
                res.status(400).send(error);
            });
    },

    updateDriver(req, res) {
        return Driver.update(
            {
                detailData: req.body.data.detailData
            },
            {
                where: {
                    id: req.body.id
                }
            }
        )
            .then(drivers => res.status(200).send(drivers))
            .catch(error => {
                res.status(400).send(error);
            });
    },

    findDriver(req, res) {
        return Driver.find({
            where: {
                id: req.query.id
            }
        })
            .then(drivers => res.status(200).send(drivers))
            .catch(error => {
                res.status(400).send(error);
            });
    },


    createDriver(req, res) {
        console.log("BODY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!: ", req.body);
        console.log("SELECTED DAYS!!!!!!!!!!!!!!!", req.body.selectedDays);
        const dateArray = [];
        const date1 = Date.now();
        const date2 = Date.now();
        dateArray.push(date1, date2);
        console.log(dateArray);
        return Driver.create({
            detailData: {
                notes: req.body.detailData.notes,
                title: req.body.detailData.title,
                address: req.body.detailData.address,
                lastName: req.body.detailData.lastName,
                firstName: req.body.detailData.firstName,
                driverType: req.body.detailData.driverType,
                phoneNumber: req.body.detailData.phoneNumber,
                emailAddress: req.body.detailData.emailAddress,
                mobileNumber: req.body.detailData.mobileNumber,

            },
            //DriverDays: { date: Date.now() },

            //association: Driver,

        }, { include: [DriverDay] })
            .then(newDriver => {
                console.log("newDriver's auto-generated ID:", newDriver.ID);
            })
            .then(newDriver => res.status(200).send(newDriver))
            .catch(error => {
                res.status(400).send(error);
            });
    },


    createDriverDays(req, res) {
        const selectedDays = req.body;
        const dateArray = [];
        const date1 = Date.now();
        const date2 = Date.now();
        dateArray.push(date1, date2);
        console.log("DATE ARRAY!!!!!!!!!!!!!! ", dateArray);
        console.log("SELECTED DAYS!!!!", selectedDays)
        return Driver.max('driverID').then(existingDriverID => {
            //req.body.forEach(date, index => {
            DriverDay.create({
                driverID: existingDriverID,
                date: dateArray
            })
            //})
        }

        )
            .then(newDriverDay => {
                console.log("newDriverDay's auto-generated ID:");
            })
            .then(newDriverDay => res.status(200).send(newDriverDay))
            .catch(error => {
                res.status(400).send(error);
            });
    },

    getDriverDays(req, res) {
        console.log(req.body);
        return DriverDay.findAll({
            include: [Driver]
        },
            {
                where: {
                    id: driver.id
                }
            })
            .then(newDriverDay => res.status(200).send(newDriverDay))
            .catch(error => {
                res.status(400).send(error);
            });
    },


};
