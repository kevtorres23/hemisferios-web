import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    name: {
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
    adultName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    startingDate: {
        type: String,
        required: true
    },
    paymentFrequency: {
        type: String,
        required: true
    },
    paymentModality: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);

const Appointment = mongoose.model("Patient", patientSchema);

export default Appointment;