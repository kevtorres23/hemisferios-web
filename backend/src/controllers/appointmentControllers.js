import Appointment from "../models/Appointments.js";
import colors from "colors";

export async function getAllAppointments(_, res) {
    try {
        const appointments = await Appointment.find().sort({ createdAt: -1 }); // "await" means: before continuing, wait until you receive this, and send it back to me.
        res.status(200).json(appointments);

    } catch (error) {
        console.error(`Error in the getAllAppointments controller`.red, error)
        res.status(500).json({ message: "Internal server error." })
    }
};

export async function getAppointmentById(req, res) {
    try {
        const targetAppointment = await Appointment.findById(req.params.id); // "await" means: before continuing, wait until you receive this, and send it back to me.
        res.status(200).json(targetAppointment);

    } catch (error) {
        console.error(`Error in the getAppointmentById controller`.red, error)
        res.status(500).json({ message: "Internal server error." })
    }
};

export async function createAppointment(req, res) {
    try {
        const {
            status,
            patientName,
            fatherSurname,
            motherSurname,
            phoneNumber,
            date,
            hour
        } = req.body;

        const newAppointment = new Appointment({
            status,
            patientName,
            fatherSurname,
            motherSurname,
            phoneNumber,
            date,
            hour
        });

        const savedAppointment = await newAppointment.save();

        await newAppointment.save();
        res.status(201).json({ message: "Appointment created successfully!", appointment: savedAppointment });

    } catch (error) {
        console.error("Error in the createAppointments controller", error)
        res.status(500).json({ message: "Internal server error." })
    }
};

export async function updateAppointment(req, res) {
    try {
        const {
            status,
            patientName,
            fatherSurname,
            motherSurname,
            phoneNumber,
            date,
            hour
        } = req.body;

        const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, {
            status,
            patientName,
            fatherSurname,
            motherSurname,
            phoneNumber,
            date,
            hour
        }, { new: true });

        if (!updatedAppointment) return res.status(404).json({ message: "Appointment not found" }); // Handling possible issues with the passed ID.

        res.status(200).json({ message: "Appointment updated successfully!", appointment: updatedAppointment });


    } catch (error) {
        console.error("Error in the updateAppointments controller", error)
        res.status(500).json({ message: "Internal server error." })
    }
};

export async function deleteAppointment(req, res) {
    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);

        if (!deletedAppointment) return res.status(404).json({ message: "Couldn't find the appointment to delete." }); // Handling possible issues with the passed ID.

        res.status(200).json({ message: "Appointment deleted successfully!" });
    } catch (error) {
        console.error("Error in the deleteAppointments controller", error)
        res.status(500).json({ message: "Internal server error." })
    }
}