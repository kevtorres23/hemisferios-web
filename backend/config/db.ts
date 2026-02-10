import mongoose from 'mongoose';
import dotenv from "dotenv";
import colors from "colors";

dotenv.config();

export const connectDB = async () => {
    const MONGO_URI = process.env.MONGO_URI;

    try {
        await mongoose.connect(MONGO_URI ? MONGO_URI : "undefined");

        console.log(`Successful conection to the database.`.blue);
    } catch (error) {
        console.error(`Error connecting to MongoDB`.red, error);
        console.log(process.env.MONGO_URI);
    }
}