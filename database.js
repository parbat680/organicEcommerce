const mongoose =require("mongoose");
require("dotenv").config();

const ConnectionDB =async ()=>{
    try {
        mongoose.connect(process.env.DATABASE_URL,()=>{
            console.log("Connected to Database sucessfully...")
        })
    } catch (error) {
      console.log(error)  
      exit(0);
    }
}

module.exports=ConnectionDB;