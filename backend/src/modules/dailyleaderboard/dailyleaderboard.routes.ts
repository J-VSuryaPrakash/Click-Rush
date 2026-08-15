import { Router } from "express";
import { authMiddleware } from "../auth/auth.middleware.js";
import { getAllLeaders } from "./dailyleaderboard.controller.js";

const router = Router();

router.get('/dailyleaders', authMiddleware, getAllLeaders);

export default router;