import express from "express";
import { getCredentials, createCredentials, updateCredentials, login } from "../controllers/credentialControllers.js";

const router = express.Router();

router.get("/", getCredentials);

router.post("/", createCredentials);

router.put("/", updateCredentials);

router.put("/login", login);

export default router;