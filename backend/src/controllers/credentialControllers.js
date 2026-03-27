import Credentials from "../models/Credentials.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

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
            email,
            password
        } = req.body;

        const hash = await bcrypt.hash(password, 12);

        const newCredentials = new Credentials({
            email,
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
            email,
            password
        } = req.body;

        const hash = await bcrypt.hash(password, 12);

        const updatedCredentials = await Credentials.findOneAndUpdate({ email: req.body.email }, {
            email,
            hash
        }, { new: true });

        if (!updatedCredentials) return res.status(404).json({ message: "Credentials not found " });

        res.status(200).json({ message: "Credentials updated succesfully!", credentials: updatedCredentials });

    } catch (error) {
        console.error("Error in the updateCredentials controller", error);
        res.status(500).json({ message: "Internal server error" });
    };
};

export async function login(req, res) {
    try {
        const {
            email,
            password
        } = req.body;

        let isEmailValid = false;
        let isPassValid = false;
        let token = "";

        const storedCredentials = await Credentials.find();
        const credentials = storedCredentials[0];

        isPassValid = await bcrypt.compare(password, credentials.hash);

        if (email === credentials.email) {
            isEmailValid = true;
        };

        if (isEmailValid && isPassValid) {
            const payload = {
                user: {
                    id: credentials._id
                }
            };

            token = await jwt.sign(
                payload,
                process.env.SESSION_SECRET,
                { expiresIn: 60 * 60 * 24 * 7 }, // One week
            );
        };

        res.json({
            emailResult: isEmailValid,
            passwordResult: isPassValid,
            token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("An error ocurred in the login controller.", error);
    };
};