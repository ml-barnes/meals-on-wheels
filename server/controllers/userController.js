const User = require("../db/models").User;
const jwt = require("jsonwebtoken");
const secret = "mysecretsshhh";

module.exports = {
  getUser(req, res) {
    if (req.headers.authorization === "Bearer") {
      return res.status(200).send({
        username: "iamuser",
        id: 123
      });
    }
    return res.status(403).send({ error: "error" });
  },

  registerUser(req, res) {
    if (req.body.secret === "create_user") {
      return User.create({ email: req.body.email, password: req.body.password })
        .then(user => {
          res.status(200).send(user);
        })
        .catch(error => {
          console.log(error);
          res.status(400).send(error);
        });
    } else {
      res.status(400).send("Secret key invalid");
    }
  },

  authenticateUser(req, res) {
    const { email, password } = req.body;
    return User.findAll({
      where: {
        email: email
      }
    })
      .then(users => {
        users[0].validPassword(password).then(result => {
          if (result) {
            const payload = { email };
            const token = jwt.sign(payload, secret, {
              expiresIn: "24h"
            });
            res.status(200).send({ token: token });
          } else {
            res.status(401).send("Invalid Password");
          }
        });
      })
      .catch(error => {
        res.status(400).send(error);
      });
  },

  checkToken(req, res) {
    res.status(200).send({ username: req.email });
  },

  removeToken(req, res) {
    //res.cookie("token", null, { httpOnly: true }).sendStatus(200);
  }
};
