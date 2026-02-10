import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import { connectDB } from "../config/db.js";
import rateLimiter from "../middlewares/rateLimiter.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

// Middlewares: functions that run in the middle of a response and a request. They are executed before sending the response back.
app.use(express.json()); // Parse JSON bodies and allow access to req.body
app.use(rateLimiter);


app.use("/api/appointments", appointmentRoutes);
// We'll add here the rest of the routes, such as contact messages, clients, therapists, etc...

// Connecting to the DB first, and then connecting to the port.
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server started on PORT: 5001`.green)
    });
});