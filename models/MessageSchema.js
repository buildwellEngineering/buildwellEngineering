import mongoose from "mongoose";

const messageSchema =mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    readByAdmin:{
        type:Boolean,
        default:false
    },
    date:{
        type: Date,
        default: Date.now
    }
},{timeStamps:true});

// const blogUser = mongoose.model.blogUser || mongoose.model("blogUser",userSchema);
 const Message = mongoose.model('message', messageSchema);

export default Message;
