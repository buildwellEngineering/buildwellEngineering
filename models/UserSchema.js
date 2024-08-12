import mongoose from "mongoose";

const userSchema =mongoose.Schema({
    email:{
        type:String,
        required: true
    },
    password:{
        type:String, 
        required: true
    },
    otp: {
        type: String,
    },
    otpExpiresAt: {
        type: Date,
    }
},{timeStamps:true});

 const adminUser = mongoose.model('adminUser', userSchema);

export default adminUser;

