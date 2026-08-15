import { Router } from "express";
import { authMiddleware } from "../auth/auth.middleware.js";
import { getAllLeaders } from "./weeklyleaderboard.controller.js";

const router = Router();

router.get('/weeklyleaders', authMiddleware, getAllLeaders);

export default router;