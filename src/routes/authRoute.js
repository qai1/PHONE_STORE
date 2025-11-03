import express from "express";
import { registerHandler } from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/auth/register", registerHandler);

export default authRouter;
