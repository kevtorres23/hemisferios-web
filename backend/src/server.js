import express from "express";
import appointmentRoutes from "./routes/appointmentRoutes.js";

const app = express();

app.use("/api/appointments", appointmentRoutes);

// Add here the rest of the routes, such as contact messages, clients, therapists, etc...

app.listen(5001, () => {
    console.log("Server started on PORT: 5001")
});