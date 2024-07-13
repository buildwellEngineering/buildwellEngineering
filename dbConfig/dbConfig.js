import mongoose, { connect } from "mongoose";
import {config} from 'dotenv'

config();

const connectionString = process.env.MONGO_URL;


export const con=async()=>{
    try {
        //await mongoose.connect('mongodb://127.0.0.1:27017/Construct');
        await mongoose.connect(connectionString);
        console.log("DATABASE CONNECTED SUCCESSFULLY !!!");
    } catch (error) {
        console.log("DATABASE CONNECTION FAILED !!!",error);
    }
}

