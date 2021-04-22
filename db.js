const mysql=require("mysql");
function database(){var db=mysql.createConnection({
    host: "localhost",
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
  return db;
}

module.exports=database();
