const express = require('express');
const router = express.Router();

const uuid = require("uuid");

const resData = require('../utilities/restaurant-data') // ./ to show this path related with app.js

router.get("/recommend", function (req, res) {
    //const htmlFilePath = path.join(__dirname,'view','recommend.html')// the way to take out the file
    //dirname to get into absolute path of project, data to access into folder
    res.render("recommend");
  });
  
router.post("/recommend", function (req, res) {
    const restaurant = req.body; // we want to store data like a whole, so we don't need to point out the value
    restaurant.id = uuid.v4(); //return a string
    const restaurants = resData.getStoredRestaurants();
    restaurants.push(restaurant);
  
    resData.storeRestaurants(restaurants);
  
    res.redirect("/confirm");
    //we redirectted so we avoid warning
    //redirect() also offered by res objectt
    //direct to confirm page
  });
  
  
router.get("/confirm", function (req, res) {
    res.render("confirm");
  });
  
router.get("/restaurants", function (req, res) {
    let order = req.query.order;
    let nextOrder = "dsc";
    if (order !=='asc' && order !=='dsc') order = 'asc';

    if(order === 'dsc') nextOrder = 'asc';

    const storedRestaurants = resData.getStoredRestaurants();

    storedRestaurants.sort(function(resA, resB){
        if(order === 'asc' && resA.name > resB.name || order === "dsc" && resA.name < resB.name)
          return 1; // 1 to flip
        return -1; // not flip
    })

    //sort on the name
    res.render("restaurants", {
      numberOfRestaurants: storedRestaurants.length,
      restaurants: storedRestaurants,
      nextOrder: nextOrder,
    });
    //render has second parameter is object
  });
  
router.get("/restaurants/:id", function (req, res) {
    //when we enter /restaurants/:id we will get inside this function
    const urlID = req.params.id; //it depends on the name we chose in url
    // this method help us get the id
  
    const storedRestaurants = resData.getStoredRestaurants();
    for (const restaurant of storedRestaurants) {
      if (restaurant.id === urlID)
        return res.render("restaurant-detail", { restaurant: restaurant });
      //we should use return to finish this loop
    }
  
    res.status(404).render("404");
  });

module.exports = router;