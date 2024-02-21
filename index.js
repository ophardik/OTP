require("dotenv").config();
const mongoose=require("mongoose");
const express=require("express");
const {connectToMongoDB}=require("./connection");
const userRoute=require("./routes/userRoute");

const app=express();

app.use(express.json());
const port=8002;

connectToMongoDB("mongodb://127.0.0.1:27017/Project-3")
.then(()=>console.log("MongoDB connected"))
.catch((err)=> console.log("MongoDB error",error));
app.use("/api",userRoute);




app.listen(port,()=>{
    console.log("Server is running on port",port);
})


