const express = require('express');

const router = express.Router() // router is object

//hold standard route not relate to restaurant
router.get("/", function (req, res) {
    res.render("index");
    // we can omit extension because we have ejx that will automatically look for ejx files
  });

router.get("/about", function (req, res) {
    //const htmlFilePath = path.join(__dirname,'view','about.html')
    //dirname to get into absolute path of project, data to access into folder
    res.render("about");
  });

module.exports = router; // export file