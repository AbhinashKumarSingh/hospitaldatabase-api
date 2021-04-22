const express=require("express");
const router=express.Router();
var db=require('./db');

router.get("/doctorinfo",(req,res)=>{
    db.query('SELECT * FROM doctor_data',(error,results,fields)=>{
        if(error)throw error;
        return res.send({error:false,data: results,message: 'Complete data'});
    });
});

router.post("/adddoctor",(req,res)=>{
    let id=req.body.id;
    let name=req.body.name;
    let email=req.body.email;
    let password=req.body.password;
 let confirm_password=req.body.confirm_password;
 let rating=req.body.rating;

    //console.log(name+" "+email+" "+password);
    if( !id && !name && !email && !password && !confirmpassword && !rating){
        return res.status(400).send({error: true, message: "please provide information"});
    }
    else if(password!=confirm_password){
        return res.status(400).send({error: true, message: "password and confirm_password doesn't match"});
    }
    db.query('INSERT INTO doctor_data(id,name,email,password,confirm_password,rating) value(?,?,?,?,?,?)',[id,name,email,password,confirm_password,rating],(error,results,fields)=>{
        if(error)throw error;
        return res.send({error:false,data: results,message: 'Complete data added'});
    });
});

router.put("/updatedoctor",(req,res)=>{
    let id=req.body.id;
    let name=req.body.name;
    let email=req.body.email;
    let password=req.body.password;
 let confirm_password=req.body.confirm_password;
 let rating=req.body.rating;
    //console.log(fname+" "+mname+" "+lname);
    if( !id && !name && !email && !password && !confirmpassword && !rating){
        return res.status(400).send({error: true, message: "please provide full information"});
    }
    db.query('UPDATE  doctor_data SET name=?,email=?,password=?,confirm_password=?,rating=? WHERE id=?',[name,email,password,confirm_password,rating,id],(error,results,fields)=>{
        if(error)throw error;
        return res.send({error:false,data: results,message: 'Complete data updated'});
    });
});

router.delete("/deletedoctor",(req,res)=>{
    let id=req.body.id;
    
    //console.log(fname+" "+mname+" "+lname);
    if(!id){
        return res.status(400).send({error: true, message: "please provide full information"});
    }
    db.query('DELETE FROM doctor_data WHERE id=?',[id],(error,results,fields)=>{
        if(error)throw error;
        return res.send({error:false,data: results,message: 'Complete data deleted'});
    });
});
module.exports=router;
