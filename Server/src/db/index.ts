import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const uri = process.env.MONGO_URI;

if (!uri) throw new Error("Database uri is missing");

export const dbConnect = () =>{
    mongoose
  .connect(uri)
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

    
}

