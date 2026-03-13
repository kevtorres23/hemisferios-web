import express from "express";
import { getAllAppointments, getAppointmentById, createAppointment, updateAppointment, deleteAppointment, getAppointmentsByStatus } from "../controllers/appointmentControllers.js";

const router = express.Router();

// Route definition.

router.get("/", getAllAppointments);

router.get("/:id", getAppointmentById);

router.get("/byStatus/:status", getAppointmentsByStatus);

router.post("/", createAppointment);

router.put("/:id", updateAppointment);

router.delete("/:id", deleteAppointment);

export default router;