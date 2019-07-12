const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = function (sequelize, Sequelize) {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    {}
  );

  User.beforeCreate((user, options) => {
    return bcrypt
      .hash(user.password, saltRounds)
      .then(hash => {
        user.password = hash;
      })
      .catch(err => {
        throw new Error();
      });
  });

  User.prototype.validPassword = function validPassword(pass) {
    return bcrypt.compare(pass, this.password);
  };

  return User;
};
