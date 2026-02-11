import mongoose from "mongoose";

const therapistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    startingDate: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    schedule: {
        type: [{
            patient: String
        }],
        required: true
    }
},
    { timestamps: true }
);

const Therapist = mongoose.model("Therapist", therapistSchema);

export default Therapist;