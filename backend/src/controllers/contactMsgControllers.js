import ContactMsg from "../models/ContactMessage.js";
import colors from "colors";

export async function getAllMessages(_, res) {
    try {
        const contactMessages = await ContactMsg.find().sort({ createdAt: -1 });
        res.status(200).json(contactMessages);

    } catch (error) {
        console.error(`Error in the getAllMessages controller.red`, error)
        res.status(500).json({ message: "Internal server error." })
    }
};

export async function getMessageById(req, res) {
    try {
        const targetMessage = await ContactMsg.findById(req.params.id); // "await" means: before continuing, wait until you receive this, and send it back to me.
        res.status(200).json(targetMessage);

    } catch (error) {
        console.error(`Error in the getMessageById controller.red`, error)
        res.status(500).json({ message: "Internal server error." })
    }
};

export async function createMessage(req, res) {
    try {
        const {
            name,
            lastName,
            phoneNumber,
            email,
            message
        } = req.body;

        const newMessage = new ContactMsg({
            name,
            lastName,
            phoneNumber,
            email,
            message
        });

        const savedMessage = await newMessage.save();

        await newMessage.save();
        res.status(201).json({ message: "Message created successfully!", appointment: savedMessage });

    } catch (error) {
        console.error("Error in the createMessage controller", error)
        res.status(500).json({ message: "Internal server error." })
    }
};

export async function deleteMessage(req, res) {
    try {
        const deletedMessage = await ContactMsg.findByIdAndDelete(req.params.id);

        if (!deletedMessage) return res.status(404).json({ message: "Couldn't find the message to delete." }); // Handling possible issues with the passed ID.

        res.status(200).json({ message: "Message deleted successfully!" });
    } catch (error) {
        console.error("Error in the deleteMessage controller", error)
        res.status(500).json({ message: "Internal server error." })
    }
};