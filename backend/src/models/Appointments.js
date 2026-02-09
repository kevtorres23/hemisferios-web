import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    motherSurname: {
        type: String,
        required: true
    },
    fatherSurname: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    hour: {
        type: String,
        required: true
    },
},
    {timestamps: true}
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;