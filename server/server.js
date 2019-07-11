const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require("body-parser");
var sequelize = require("./db/models").sequelize;
var cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
var indexRouter = require("./routes/index");

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization, Cookies, Set-Cookie"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/", indexRouter);

// use it before all route definitions
var cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));

//Sync Database
sequelize
  .sync()
  //.authenticate()
  .then(() => {
    console.log("Nice! Database looks fine");
  })
  .catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!");
  });

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
