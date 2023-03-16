const express = require('express');
const path = require('path');
const ejs = require('ejs');
const admin = require('./routes/admin');
const property = require('./routes/property')
const app = express();
const PORT = 3000;
const homePageController = require('./controller/HomePageController');
//Setting the routes
app.use('/admin',admin);
app.use('/rooms',property);

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
        res.json(jsonArrayRespose[0]);    
    }else{
        res.json({});    
    }
})

app.post('/register',async (req,res)=>{
    let jsonResponse = await homePageController.addUser(req.body);
    res.json(jsonResponse);
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