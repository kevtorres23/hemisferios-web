import express from "express";
import { getAllAppointments, getAppointmentById, createAppointment, updateAppointment, deleteAppointment, getAppointmentsByStatus, getAppointmentsByDates } from "../controllers/appointmentControllers.js";

const router = express.Router();

// Route definition.

router.get("/", getAllAppointments);

router.get("/:id", getAppointmentById);

router.get("/byStatus/:status", getAppointmentsByStatus);

router.get("/dateRange/:date1/:date2", getAppointmentsByDates);

router.post("/", createAppointment);

router.put("/:id", updateAppointment);

router.delete("/:id", deleteAppointment);

export default router;