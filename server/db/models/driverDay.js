module.exports = function (sequelize, Sequelize) {
    const DriverDay = sequelize.define("DriverDay",
        {
            date: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
        },

        {
            // options
            timestamps: false,
        }
    );

    DriverDay.removeAttribute('id');

    DriverDay.associate = models => {
        DriverDay.belongsTo(models.Driver, { foreignKey: 'driverID', allowNull: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    };

    return DriverDay;
};
