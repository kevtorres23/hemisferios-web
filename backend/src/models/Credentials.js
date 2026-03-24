import mongoose from "mongoose";

const credentialSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    }
});

const Credentials = mongoose.model("Credentials", credentialSchema);
export default Credentials;