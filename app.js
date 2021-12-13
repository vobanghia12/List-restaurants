const fs = require('fs');

const path = require('path');

const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'view',)); // we telling express where can find our template that we want to process with template engine 
// the seconde parameter is that the path contains our template file
// views and view engine are reserved key word that express decides it
app.set('view engine', 'ejs');
app.use(express.static('public')) // we have to pass one parameter name public
//everthing in this public folder will be set public
// everthing you put in public files, will be accessed directly by user enter the path to file in their browser address bar
app.use(express.urlencoded({extended: false}));
//middleware handle post request

app.get('/recommend',function(req,res){
    //const htmlFilePath = path.join(__dirname,'view','recommend.html')// the way to take out the file
    //dirname to get into absolute path of project, data to access into folder
    res.render('recommend')
})

app.post('/recommend',function(req,res)
{
    const restaurant = req.body; // we want to store data like a whole, so we don't need to point out the value
    const filePath = path.join(__dirname, 'data', 'restaurants.json');

    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    storedRestaurants.push(restaurant);

    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants))

    res.redirect('/confirm') 
    //we redirectted so we avoid warning 
    //redirect() also offered by res objectt
    //direct to confirm page

});

app.get('/about',function(req,res){
    //const htmlFilePath = path.join(__dirname,'view','about.html')
    //dirname to get into absolute path of project, data to access into folder
    res.render('about');
})

app.get('/confirm',function(req,res){
    res.render('confirm');
})

app.get('/',function(req,res){
    res.render('index');
    // we can omit extension because we have ejx that will automatically look for ejx files
})

app.get('/restaurants',function(req,res){
    const filePath = path.join(__dirname, 'data', 'restaurants.json');

    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);
    res.render('restaurants',{numberOfRestaurants : storedRestaurants.length, restaurants: storedRestaurants});
    //render has second parameter is object
})


app.listen(3000);