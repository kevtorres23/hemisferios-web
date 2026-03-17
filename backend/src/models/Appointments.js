import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        default: "pending",
    },
    patientName: {
        type: String,
        required: true
    },
    fatherSurname: {
        type: String,
        required: true
    },
    motherSurname: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    hour: {
        type: String,
        required: true
    },
    cancellationComment: {
        type: String,
        required: false,
        default: "placeholder",
    },
},
    { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;