module.exports = function (sequelize, Sequelize) {
    const Cluster = sequelize.define("Cluster",
        {
            date: {
                type: Sequelize.DATEONLY,
                primaryKey: true,
                allowNull: false
            },
            clusterData: {
                type: Sequelize.JSONB,
                allowNull: false
            }
        },
        {
            // options
            timestamps: false,
        }
    );

    // Creates a FOREIGN KEY reference between the DriverDelivery and Cluster tables
    /*Cluster.associate = models => {
        Cluster.hasMany(models.DriverDelivery, { primaryKey: true, foreignKey: 'clusterID', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    };*/


    return Cluster;
};
