const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname,"..", "data", "restaurants.json");
// .. to go higher directory
function getStoredRestaurants(){
    const fileData = fs.readFileSync(filePath); //fs not work because we did not require fs package
    const storedRestaurants = JSON.parse(fileData);
    return storedRestaurants;
}


function storeRestaurants(storableRestaurant){
    fs.writeFileSync(filePath, JSON.stringify(storableRestaurant));
}

module.exports = {
    getStoredRestaurants: getStoredRestaurants, // don't add parentheses here
    storeRestaurants: storeRestaurants
}