module.exports = function (sequelize, Sequelize) {
    const Driver = sequelize.define("Driver",
        {
            driverID: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            detailData: {
                type: Sequelize.JSONB,
                allowNull: false
            },
            active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        },
    );

    Driver.associate = models => {
        Driver.hasMany(models.DriverDay, { foreignKey: 'driverID', allowNull: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    };


    return Driver;
};
