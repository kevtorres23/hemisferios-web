import express from "express";
import { getAllMessages, getMessageById, createMessage, deleteMessage } from "../controllers/contactMsgControllers.js";

const router = express.Router();

// Route definition.

router.get("/", getAllMessages);

router.get("/:id", getMessageById);

router.post("/", createMessage);

router.delete("/:id", deleteMessage);

export default router;