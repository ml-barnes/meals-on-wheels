// Example code for how models should be structured

module.exports = function (sequelize, Sequelize) {
  var Extra = sequelize.define(
    "Extra",
    {
      date: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      // customerID: {
      //   type: Sequelize.INTEGER,
      //   primaryKey: true
      //   // references: {
      //   //   model: "Customer", // Can be both a string representing the table name or a Sequelize model
      //   //   key: "id"
      //   // } //Model does not exist
      // },
      mealData: {
        type: Sequelize.JSONB
      }
    },
    {
      // options
    }
  );

  // Problem, when using raw query the sequelize assosiation isn't created.
  // This makes queries difficult. So better solution is to use sequelize assosisation
  // That creates the FK, then drop the default PK constraint and create a composite key
  // With a raw query.

  sequelize
    .query(
      `ALTER TABLE public."Extras" DROP CONSTRAINT "Extras_pkey";
      ALTER TABLE public."Extras" ADD PRIMARY KEY ("CustomerId", "date");`,
      {
        type: sequelize.QueryTypes.ALTER
      }
    )
    .then(result => console.log("Result ---------------->", result))
    .catch(error => console.log("Error ---------------->", error));

  return Extra;
};
