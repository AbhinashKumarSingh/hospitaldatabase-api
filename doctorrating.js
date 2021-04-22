const express=require("express");
const router=express.Router();
const mysql=require("mysql");
const db=mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: "root",
    password: "",
    database: "hospitaldatabase"
});
db.connect((error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log("mysql connected ....");
    }
  });
router.get("/",(req,res)=>{
    return res.send({error:true,message:'hello'})
});

router.get("/doctorratinginfo",(req,res)=>{
    db.query('SELECT * FROM doctor_rating',(error,results,fields)=>{
        if(error)throw error;
        return res.send({error:false,data: results,message: 'Complete data'});
    });
});

router.post("/adddoctorrating",(req,res)=>{
    let id=req.body.id;
    let name=req.body.name;
    let email=req.body.email;
    let rating=req.body.rating;
 //let confirm_password=req.body.confirm_password;

    //console.log(name+" "+email+" "+password);
    if( !id && !name && !email && !rating){
        return res.status(400).send({error: true, message: "please provide information"});
    }
    
    db.query('INSERT INTO doctor_rating(id,name,email,rating) value(?,?,?,?)',[id,name,email,rating],(error,results,fields)=>{
        if(error)throw error;
        return res.send({error:false,data: results,message: 'Complete data added'});
    });
});

router.put("/updatedoctorrating",(req,res)=>{
    let id=req.body.id;
    let name=req.body.name;
    let email=req.body.email;
    let rating=req.body.rating;
    //console.log(fname+" "+mname+" "+lname);
    if( !id && !name && !email && !rating){
        return res.status(400).send({error: true, message: "please provide full information"});
    }
    db.query('UPDATE  doctor_rating SET name=?,email=?,rating=? WHERE id=?',[name,email,rating,id],(error,results,fields)=>{
        if(error)throw error;
        return res.send({error:false,data: results,message: 'Complete data updated'});
    });
});

router.delete("/deletedoctorrating",(req,res)=>{
    let id=req.body.id;
    
    //console.log(fname+" "+mname+" "+lname);
    if(!id){
        return res.status(400).send({error: true, message: "please provide full information"});
    }
    db.query('DELETE FROM doctor_rating WHERE id=?',[id],(error,results,fields)=>{
        if(error)throw error;
        return res.send({error:false,data: results,message: 'Complete data deleted'});
    });
});
module.exports=router;