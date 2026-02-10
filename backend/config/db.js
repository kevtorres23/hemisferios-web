import mongoose from 'mongoose';
import dotenv from "dotenv";
import colors from "colors";

dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log(`Successful conection to the database.`.blue);
    } catch (error) {
        console.error(`Error connecting to MongoDB`.red, error);
        console.log(process.env.MONGOURL);
    }
}