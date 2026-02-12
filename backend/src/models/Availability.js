import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema({
    weekStart: {
        type: String,
        required: true
    },
    weekFinish: {
        type: String,
        required: true
    },
    lunes: {
        type: [String],
        required: true,
    },
    martes: {
        type: [String],
        required: true,
    },
    miercoles: {
        type: [String],
        required: true,
    },
    jueves: {
        type: [String],
        required: true,
    },
    viernes: {
        type: [String],
        required: true,
    },
    sabado: {
        type: [String],
        required: true,
    }
},
    { timestamps: true }
);

const Availability = mongoose.model("availabilityDays", availabilitySchema);

export default Availability;