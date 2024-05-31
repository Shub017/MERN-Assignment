import mongoose from "mongoose";

export const connectToMongoDB = async ()=>{
    try{
        await mongoose.connect(process.env.mongoDBURL);
        console.log("MongoDB Connected");
    }catch(err){
        console.log(err);
    }
}