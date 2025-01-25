import mongoose from "mongoose";
import config from "../config.js";

export const dbinit = ()=>{
    console.log("url is : ", config.db_url)
    mongoose.connect(config.db_url)
         .then(()=>{
             console.log("DB connected successfully")
         })
         .catch((err)=>{
             console.log("DB connection failed with error : ", err)
         })
         .finally(()=>{
            console.log('DB connection attempt successful')
         })
}