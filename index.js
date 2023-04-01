const express = require('express');
const path = require('path');
const ejs = require('ejs');
const admin = require('./routes/admin');
const property = require('./routes/property')
const booking = require('./routes/booking');
const host = require('./routes/host');
const app = express();
const PORT = 3000;
const homePageController = require('./controller/HomePageController');
const { userValidationRules, validate } = require('./middleware/validator');
//Setting the routes
app.use('/admin',admin);
app.use('/rooms',property);
app.use('/book',booking);
app.use('/host',host);

app.set('view engine','ejs');//Telling express that this engine will be used
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('views'));
//Serve the public folder
app.use(express.static('public'));
//Serve the static css files
app.use(express.static(path.join(__dirname,'/views/css')));
//Serve the static js files
app.use(express.static(path.join(__dirname,'/views/js')));
app.get('/',async (req,res)=>{
    let result = await homePageController.get();
    res.render('Homepage',result);
})

app.get('/search',async (req,res)=>{
    let result = await homePageController.getQuery(req.query);
    res.render('Homepage',result);
})

app.post('/auth',async (req,res)=>{
    
    let jsonArrayRespose = await homePageController.authenticateUser(req.body);

    if (jsonArrayRespose.length !=0){
        if (jsonArrayRespose[0].password != req.body.password) {
            res.status(400).json({"errors":{
                status:400,
                message: "Invalid Password"
             }
            })
            return
        }else{
            res.json(jsonArrayRespose[0]);    
        }
    }else{
        //Todo : Handle if no response, send no user response and handle it in homePage.js file
        res.json({});    
    }
})

app.post('/register',userValidationRules(),validate,async (req,res)=>{
    let jsonResponse = await homePageController.addUser(req.body);
    res.status(200).json(jsonResponse);
})

app.use((error,req,res,next)=>{
    res.send({
        success:false,
        message: "Something went wrong , please contact helpdesk",
        failureReason: error.message
    })

    next()
})

app.listen(PORT,()=>{
    console.log("The app is running at port: "+PORT);
});