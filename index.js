const express=require("express");
const path=require("path");
const mysql=require("mysql");
const bodyparse =require("body-parser");
const cors=require("cors");
 const app=express();
const port=process.env.PORT || 3005;
var db=require('./db');
  app.use(bodyparse.json());
app.use(cors());
app.use(bodyparse.urlencoded({
    extended:true
}));

app.set("view engine",'hbs');
console.log(app.get('view engine'));

app.use(express.static("views"))

 app.listen(port,()=>{
     console.log(`server is running ${port}`);
 });
/* app.get("/",(req,res)=>{
     res.render('index',{
         message:'homepage'
     });
 });
 app.get("/userregistration",(req,res)=>{
    res.render('userregistration',{
        message: 'user registration page'
    });
})
app.get("/doctorregistration",(req,res)=>{
    res.render('doctorregistration',{
        message: 'doctor registration page'
    });
})

app.get("/labregistration",(req,res)=>{
    res.render('labregistration',{
        message: 'lab registration page'
    });
})
app.get("/hospitalregistration",(req,res)=>{
    res.render('hospitalregistration',{
        message: 'hospital registration page'
    });
});*/
app.use('/',require('./routes/user'));
app.use('/',require('./routes/doctor'));
app.use('/',require('./routes/hospital'));
app.use('/',require('./routes/lab'));
app.use('/',require('./routes/doctorrating'));
