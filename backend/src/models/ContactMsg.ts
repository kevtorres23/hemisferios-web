import mongoose from "mongoose";

const contactMsgSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);

const ContactMsg = mongoose.model("ContactMsg", contactMsgSchema);

export default ContactMsg;