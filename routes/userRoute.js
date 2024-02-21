require("dotenv").config();
const express=require("express");
const router = express.Router(); 

// Middleware
// router.use(express.json());

const userController=require("../controller/userController");

router.post("/send-otp",userController.sendOtp)

module.exports=router;