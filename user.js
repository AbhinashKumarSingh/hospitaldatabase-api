const express=require("express");
const router=express.Router();
var db=require('./db');
router.get("/",(req,res)=>{
    return res.send({error:true,message:'hello'})
});

router.get("/userinfo",(req,res)=>{
    db.query('SELECT * FROM user_data',(error,results,fields)=>{
        if(error)throw error;
        return res.send({error:false,data: results,message: 'Complete data'});
    });
});

router.post("/adduser",(req,res)=>{
    let id=req.body.id;
    let name=req.body.name;
    let email=req.body.email;
    let password=req.body.password;
 let confirm_password=req.body.confirm_password;

    //console.log(name+" "+email+" "+password);
    if( !id && !name && !email && !password && !confirmpassword){
        return res.status(400).send({error: true, message: "please provide information"});
    }
    db.query('INSERT INTO user_data(id,name,email,password,confirm_password) value(?,?,?,?,?)',[id,name,email,password,confirm_password],(error,results,fields)=>{
        if(error)throw error;
        return res.send({error:false,data: results,message: 'Complete data added'});
    });
});

router.put("/updateuser",(req,res)=>{
    let id=req.body.id;
    let name=req.body.name;
    let email=req.body.email;
    let password=req.body.password;
 let confirm_password=req.body.confirm_password;
    //console.log(fname+" "+mname+" "+lname);
    if( !id && !name && !email && !password && !confirmpassword){
        return res.status(400).send({error: true, message: "please provide full information"});
    }
    db.query('UPDATE  user_data SET name=?,email=?,password=?,confirm_password=? WHERE id=?',[id,name,email,password,,confirm_passwordid],(error,results,fields)=>{
        if(error)throw error;
        return res.send({error:false,data: results,message: 'Complete data updated'});
    });
});

router.delete("/deleteuser",(req,res)=>{
    let id=req.body.id;
    
    //console.log(fname+" "+mname+" "+lname);
    if(!id){
        return res.status(400).send({error: true, message: "please provide full information"});
    }
    db.query('DELETE FROM user_data WHERE id=?',[id],(error,results,fields)=>{
        if(error)throw error;
        return res.send({error:false,data: results,message: 'Complete data deleted'});
    });
});
module.exports=router;
