import Therapist from "../models/Therapists.js";
import colors from "colors";

export async function getAllTherapists(_, res) {
    try {
        const therapist = await Therapist.find().sort({ createdAt: -1 });
        res.status(200).json(therapist);

    } catch (error) {
        console.error(`Error in the getAllTherapists controller.red`, error)
        res.status(500).json({ message: "Internal server error." })
    }
};

export async function getTherapistById(req, res) {
    try {
        const targetTherapist = await Therapist.findById(req.params.id);
        res.status(200).json(targetTherapist);

    } catch (error) {
        console.error(`Error in the getTherapistById controller.red`, error)
        res.status(500).json({ message: "Internal server error." })
    }
};

export async function createTherapist(req, res) {
    try {
        const {
            name,
            lastName,
            startingDate,
            contactNumber,
        } = req.body;

        const newTherapist = new Therapist({
            name,
            lastName,
            startingDate,
            contactNumber,
        });

        const savedTherapist = await newTherapist.save();

        res.status(201).json({ message: "Therapist created successfully!", patient: savedTherapist });

    } catch (error) {
        console.error("Error in the createTherapist controller", error)
        res.status(500).json({ message: "Internal server error." })
    }
};

export async function updateTherapist(req, res) {
    try {
        const {
            name,
            lastName,
            startingDate,
            contactNumber,
            schedule
        } = req.body;

        const updatedTherapist = await Therapist.findByIdAndUpdate(req.params.id, {
            name,
            lastName,
            startingDate,
            contactNumber,
            schedule
        }, { new: true });

        if (!updatedTherapist) return res.status(404).json({ message: "Therapist not found" }); // Handling possible issues with the passed ID.

        res.status(200).json({ message: "Therapist updated successfully!", message: updatedTherapist });

    } catch (error) {
        console.error("Error in the updateTherapist controller", error)
        res.status(500).json({ message: "Internal server error." })
    }
};


export async function deleteTherapist(req, res) {
    try {
        const deletedTherapist = await Therapist.findByIdAndDelete(req.params.id);

        if (!deletedTherapist) return res.status(404).json({ message: "Couldn't find the therapist to delete." });

        res.status(200).json({ message: "Therapist deleted successfully!" });
    } catch (error) {
        console.error("Error in the deleteTherapist controller", error)
        res.status(500).json({ message: "Internal server error." })
    }
};