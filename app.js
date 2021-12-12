const path = require('path');

const express = require('express');

const app = express();

app.use(express.static('public')) // we have to pass one parameter name public
//everthing in this public folder will be set public
// everthing you put in public files, will be accessed directly by user enter the path to file in their browser address bar

app.get('/recommend',function(req,res){
    const htmlFilePath = path.join(__dirname,'view','recommend.html')// the way to take out the file
    //dirname to get into absolute path of project, data to access into folder
    res.sendFile(htmlFilePath);
})

app.get('/about',function(req,res){
    const htmlFilePath = path.join(__dirname,'view','about.html')
    //dirname to get into absolute path of project, data to access into folder
    res.sendFile(htmlFilePath);
})

app.get('/confirm',function(req,res){
    const htmlFilePath = path.join(__dirname,'view','confirm.html')
    //dirname to get into absolute path of project, data to access into folder
    res.sendFile(htmlFilePath);
})

app.get('/index',function(req,res){
    const htmlFilePath = path.join(__dirname,'view','index.html')
    //dirname to get into absolute path of project, data to access into folder
    res.sendFile(htmlFilePath);
})

app.get('/restaurants',function(req,res){
    const htmlFilePath = path.join(__dirname,'view','restaurants.html')
    //dirname to get into absolute path of project, data to access into folder
    res.sendFile(htmlFilePath);
})

app.listen(3000);