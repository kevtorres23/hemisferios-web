import Availability from "../models/Availability.js";
import colors from "colors";

export async function getAvailability(_, res) {
    try {
        const availability = await Availability.find();
        res.status(200).json(availability);

    } catch (error) {
        console.error(`Error in the getAllDays controller.red`, error)
        res.status(500).json({ message: "Internal server error." })
    }
};

export async function createAvailability(req, res) {
    try {
        const {
            lunes,
            martes,
            miercoles,
            jueves,
            viernes,
            sabado,
        } = req.body;

        const newAvailability = new Availability({
            lunes,
            martes,
            miercoles,
            jueves,
            viernes,
            sabado,
        });

        const savedAvailability = await newAvailability.save();

        res.status(201).json({ message: "Availability created successfully!", availability: savedAvailability });

    } catch (error) {
        console.error("Error in the createAvailability controller", error)
        res.status(500).json({ message: "Internal server error." })
    }
};

export async function updateAvailability(req, res) {
    try {
        const {
            lunes,
            martes,
            miercoles,
            jueves,
            viernes,
            sabado,
        } = req.body;

        const updatedAvailability = await Availability.findByIdAndUpdate(req.params.id, {
            lunes,
            martes,
            miercoles,
            jueves,
            viernes,
            sabado,
        }, { new: true });

        if (!updatedAvailability) return res.status(404).json({ message: "Availability not found" }); // Handling possible issues with the passed ID.

        res.status(200).json({ message: "Availability updated successfully!", availability: updatedAvailability });

    } catch (error) {
        console.error("Error in the updateAvailability controller", error)
        res.status(500).json({ message: "Internal server error." })
    }
};

export async function deleteAvailability(req, res) {
    try {
        const deletedAvailability = await Availability.findByIdAndDelete(req.params.id);

        if (!deletedAvailability) return res.status(404).json({ message: "Couldn't find the availability to delete." });

        res.status(200).json({ message: "Availability deleted successfully!" });
    } catch (error) {
        console.error("Error in the deleteAvailability controller", error)
        res.status(500).json({ message: "Internal server error." })
    }
};