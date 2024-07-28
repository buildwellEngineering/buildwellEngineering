import mongoose from "mongoose";

const userSchema =mongoose.Schema({
    email:{
        type:String,
    },
    password:{
        type:String, 
    },
    refreshToken:{
        type:String,
    },
    loginStatus:{
        type:Boolean,
        default:false
    },
    otp: {
        type: String,
    },
    otpExpiresAt: {
        type: Date,
    }
},{timeStamps:true});

// const blogUser = mongoose.model.blogUser || mongoose.model("blogUser",userSchema);
 const adminUser = mongoose.model('adminUser', userSchema);

export default adminUser;

