import Credentials from "../models/Credentials";
import bcrypt from "bcrypt";

export async function getCredentials(_, res) {
    try {
        const credentials = await Credentials.find();
        res.status(200).json(credentials);
    } catch (error) {
        console.error("There was an error while getting the system credentials.");
        res.status(500).json({ message: "Internal server error." })
    };
};

export async function createCredentials(req, res) {
    try {
        const {
            username,
            password
        } = req.body;

        const hash = await bcrypt.hash(password, 12);

        const newCredentials = new Credentials({
            username,
            hash
        });

        const savedCredentials = await newCredentials.save();
        await newCredentials.save();

        res.status(201).json({ message: "Credentials saved successfully", credentials: savedCredentials });

    } catch (error) {
        console.error("Error in the createCredentials controller", error);
        res.status(500).json({ message: "Internal server error" });
    };
};

export async function updateCredentials(req, res) {
    try {
        const {
            username,
            password
        } = req.body;

        const hash = await bcrypt.hash(password, 12);

        const updatedCredentials = await Credentials.findOneAndUpdate({
            username,
            hash
        }, { new: true });

        if (!updatedCredentials) return res.status(404).json({ message: "Credentials not found "});

        res.status(200).json({ message: "Credentials updated succesfully!", credentials: updatedCredentials });

    } catch (error) {
        console.error("Error in the updateCredentials controller", error);
        res.status(500).json({ message: "Internal server error" });
    };
}