import Credentials from "../models/Credentials.js";
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

        const storedCredentials = await Credentials.find();
        let emailValid = false;
        let passwordValid = false;

        const isPassValid = await bcrypt.compare(password, storedCredentials[0].hash);

        if (email === storedCredentials[0].email) emailValid = true;
        if (isPassValid) passwordValid = true;

        if (emailValid && passwordValid) {
            res.send("both are correct babe");
        } else {
            res.send(
                {
                    emailResult: emailValid,
                    passwordResult: passwordValid
                }
            );
        };

    } catch (error) {
        console.log(error);
    };
};