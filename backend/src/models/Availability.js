import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema({
    weekRange: {
        type: String,
        required: true
    },
    monday: {
        type: [String],
        required: true,
    },
    tuesday: {
        type: [String],
        required: true,
    },
    wednesday: {
        type: [String],
        required: true,
    },
    thursday: {
        type: [String],
        required: true,
    },
    friday: {
        type: [String],
        required: true,
    },
    saturday: {
        type: [String],
        required: true,
    }
},
    { timestamps: true }
);

const Availability = mongoose.model("availabilityDays", availabilitySchema);

export default Availability;