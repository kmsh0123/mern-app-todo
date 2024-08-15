import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import TodoRoute from "./routes/TodoRoute.js"
import cors from "cors"
import multer from 'multer';

dotenv.config();
const app = express();
const port = process.env.PORT;
const DB = process.env.MONGO_URL;
const upload = multer(); // This will handle parsing form-data

// Middleware to handle form-data

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors());
app.use(upload.none());

//Route
app.use("/api",TodoRoute);

app.use("/",(req,res)=>{
    res.json({message : `Hello I am NodeJs Server`});
    
})

mongoose.connect(DB).then(()=>{
    app.listen(port,(e)=>{
        if(e){
            console.log(e);
        }else{
            console.log(`Server on port ${port} and Database Connected`);
        } 
    })
}).catch((error)=>{
    console.log(error);
})