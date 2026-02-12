import express from "express";
import { getAllPatients, getPatientById, createPatient, updatePatient, deletePatient } from "../controllers/patientControllers.js";

const router = express.Router();

// Route definition.

router.get("/", getAllPatients);

router.get("/:id", getPatientById);

router.post("/", createPatient);

router.put("/:id", updatePatient);

router.delete("/:id", deletePatient);

export default router;