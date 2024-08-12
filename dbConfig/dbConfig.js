import mongoose from "mongoose";

export const con=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        // console.log("DATABASE CONNECTED SUCCESSFULLY !!!");
    } catch (error) {
        console.log("DATABASE CONNECTION FAILED !!!",error);
    }
}

