import mongoose from "mongoose";

const projectSchema =mongoose.Schema({
    projectTitle:{
        type:String,
    },
    projectMediaUrl:{
        type:String,
    },
    projectDescription:{
        type:String
    },
    projectDisplay:{
        type:Boolean,
        default:false
    },
    projectFileName:{
        type:String
    }
},{timeStamps:true});

// const blogUser = mongoose.model.blogUser || mongoose.model("blogUser",userSchema);
 const project = mongoose.model('project', projectSchema);

export default project;
