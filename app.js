const path = require("path");

const express = require("express");

const defaultRoutes = require('./routes/default') // to get default route from another folder

const restaurantRoutes = require('./routes/restaurant');

const app = express();

app.set("views", path.join(__dirname, "view")); // we telling express where can find our template that we want to process with template engine
// the seconde parameter is that the path contains our template file
// views and view engine are reserved key word that express decides it
app.set("view engine", "ejs");
app.use(express.static("public")); // we have to pass one parameter name public
//everthing in this public folder will be set public
// everthing you put in public files, will be accessed directly by user enter the path to file in their browser address bar
app.use(express.urlencoded({ extended: false }));
//middleware handle post request

app.use('/', defaultRoutes) // it will filter all of route contain "/" and if it matches, it will be responded. If not, it will be looking for other requests
app.use('/', restaurantRoutes);

app.use(function (req, res) {
  res.status(404).render("404"); // status allow us to custom the name of error
});
// we put this wrong path handler at the end because we wait until no route above can handle it and this middleware solve it

app.use(function (error, req, res, next) { // handling server needs to have 4 parameters
    res.status(500).render("500");
  });
app.listen(3000);
