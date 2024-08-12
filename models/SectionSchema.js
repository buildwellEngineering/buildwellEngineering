import mongoose from "mongoose";

const sectionSchema =mongoose.Schema({
    sectionName:{
        type:String,
    },
    sectionMediaUrl:{
        type:[String],
    },
    sectionText:{
        type:String
    },
    sectionFileName:{
        type:[String]
    }
},{timeStamps:true});

 const section = mongoose.model('section', sectionSchema);

export default section;

