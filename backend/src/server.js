import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import { connectDB } from "../config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

// Calling the connection method.
connectDB();

app.use("/api/appointments", appointmentRoutes);
// We'll add here the rest of the routes, such as contact messages, clients, therapists, etc...

app.use(cors());

app.listen(port, () => {
    console.log(`Server started on PORT: 5001`.green)
});