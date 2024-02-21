const otpModel=require("../model/otp");

const otpGenerator=require("otp-generator");
const twilio=require("twilio");

const accountSid=process.env.TWILIO_ACCOUNT_SID;
const authToken=process.env.TWILIO_AUTH_TOKEN;

const twilioClient=new twilio(accountSid,authToken);

const sendOtp=async (req,res)=>{
    try{
  
        const {phoneNumber}=req.body;
        const otp=otpGenerator.generate(4,{upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false});

        const cDate=new Date();

         otpModel.findOneAndUpdate(
            {phoneNumber},
            {otp,otpExpiration: new Date(cDate.getTime()) },
            {upsert:true, new:true, setDefaultOnInsert:true, },
        );

        twilioClient.messages.create({
            body:`Your OTP is${otp}`,
            to:phoneNumber,
            from:process.env.TWILIO_MOBILE_NNUMBER,
        });

        return res.status(200).json({
            success:true,
            msg:otp,
           });

    }
    catch(error){
       return res.status(400).json({
        success:false,
        msg:error.message,
       });
    }
}

module.exports={
    sendOtp,
}