const express = require('express');
const path = require('path');
const app = express.Router();
const { userValidationRules, validate } = require('../middleware/validator');
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

app.post('/authenticate',async (req,res)=>{
    let result = await homePageController.authenticateUser(req.body);
    if (result.length!=0){
        if (result[0].password != req.body.password) {
            res.status(400).json({"errors":{
                status:400,
                message: "Invalid Password"
             }
            })
            return
        }else{
           res.send(result[0]);
        }
    }else{
        res.send({});
    }  
})

app.post('/register',userValidationRules(),validate,async (req,res)=>{

    let response = await homePageController.addUser(req.body);

    res.send(response);
})

module.exports = app;