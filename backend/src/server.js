import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import contactMsgRoutes from "./routes/contactMsgRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import therapistRoutes from "./routes/therapistRoutes.js";
import availabilityRoutes from "./routes/availabilityRoutes.js";
import { connectDB } from "../config/db.js";
import rateLimiter from "../middlewares/rateLimiter.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

// Middlewares: functions that run in the middle of a response and a request. They are executed before sending the response back.
app.use(express.json()); // Parse JSON bodies and allow access to req.body
app.use(rateLimiter);


app.use("/api/appointments", appointmentRoutes);
app.use("/api/messages", contactMsgRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/therapists", therapistRoutes);
app.use("/api/availability", availabilityRoutes);

app.use(cors());

// Connecting to the DB first, and then connecting to the port.
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server started on PORT: 5001`.green)
    });
});