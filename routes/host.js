const express = require('express');
const path = require('path');
const app = express.Router();
const {formValidationRules,validateForm } = require('../middleware/validator');
const homePageController = require('../controller/HomePageController');
const adminPageController = require('../controller/AdminPageController');
const hostPageController = require('../controller/HostPageController');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Serve the public folder
app.use(express.static('public'));
//Serve the static css files
app.use(express.static(path.join(__dirname, '/views/css')));
//Serve the static js files
app.use(express.static(path.join(__dirname, '/views/js')));

app.get('/',async (req,res)=>{
    let result = await hostPageController.getHostProperties(req.query['email'],req.query['phone']);
    res.render('Adminpage',result);
})

app.post('/addProp',formValidationRules(),validateForm,(req,res)=>{
    res.status(201).json({
        success: true,
        message: "Property add request sent"
    })
})

app.put('/editProp',formValidationRules(),validateForm,(req,res)=>{
    res.status(200).json({
        success: true,
        message: "Property edit request sent"
    })
})

app.delete('/deleteProp',(req,res)=>{
    res.status(200).json({
        success: true,
        message: "Property delete request sent"
    })
})
module.exports = app;