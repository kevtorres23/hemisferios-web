import Patient from "../models/Patients.js";
import colors from "colors";

export async function getAllPatients(_, res) {
    try {
        const patient = await Patient.find().sort({ createdAt: -1 }); // To sort the patients from most recent to least.
        res.status(200).json(patient);

    } catch (error) {
        console.error(`Error in the getAllPatients controller.red`, error)
        res.status(500).json({ message: "Internal server error." })
    }
};

export async function getPatientById(req, res) {
    try {
        const targetPatient = await Patient.findById(req.params.id);
        res.status(200).json(targetPatient);

    } catch (error) {
        console.error(`Error in the getPatientById controller.red`, error)
        res.status(500).json({ message: "Internal server error." })
    }
};

export async function createPatient(req, res) {
    try {
        const {
            name,
            fatherSurname,
            motherSurname,
            adultName,
            contactNumber,
            startingDate,
            paymentFrequency,
            paymentModality,

        } = req.body;

        const newPatient = new Patient({
            name,
            fatherSurname,
            motherSurname,
            adultName,
            contactNumber,
            startingDate,
            paymentFrequency,
            paymentModality,
        });

        const savedPatient = await newPatient.save();

        res.status(201).json({ message: "Patient created successfully!", patient: savedPatient });

    } catch (error) {
        console.error("Error in the createPatient controller", error)
        res.status(500).json({ message: "Internal server error." })
    }
};

export async function updatePatient(req, res) {
    try {
        const {
            name,
            fatherSurname,
            motherSurname,
            adultName,
            contactNumber,
            startingDate,
            paymentFrequency,
            paymentModality
        } = req.body;

        const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, {
            name,
            fatherSurname,
            motherSurname,
            adultName,
            contactNumber,
            startingDate,
            paymentFrequency,
            paymentModality
        }, { new: true });

        if (!updatedPatient) return res.status(404).json({ message: "Patient not found" }); // Handling possible issues with the passed ID.

        res.status(200).json({ message: "Patient updated successfully!", message: updatedPatient });

    } catch (error) {
        console.error("Error in the updatePatient controller", error)
        res.status(500).json({ message: "Internal server error." })
    }
};


export async function deletePatient(req, res) {
    try {
        const deletedPatient = await Patient.findByIdAndDelete(req.params.id);

        if (!deletedPatient) return res.status(404).json({ message: "Couldn't find the patient to delete." });

        res.status(200).json({ message: "Patient deleted successfully!" });
    } catch (error) {
        console.error("Error in the deletePatient controller", error)
        res.status(500).json({ message: "Internal server error." })
    }
};