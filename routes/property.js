const express = require('express');
const path = require('path');
const app = express.Router();
const propertyPageController = require('../controller/PropertyPageController');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Serve the public folder
app.use(express.static('public'));
//Serve the static css files
app.use(express.static(path.join(__dirname, '/views/css')));
//Serve the static js files
app.use(express.static(path.join(__dirname, '/views/js')));


app.get('/:id',async (req,res)=>{
    let propName = req.params['id'];
    let response = await propertyPageController.fetchPropertyDetails(propName);
    res.render('Propertypage',response);

})


module.exports = app;