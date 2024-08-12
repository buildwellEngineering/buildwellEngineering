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

 const project = mongoose.model('project', projectSchema);

export default project;
