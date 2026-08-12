import { Router } from "express";
import { authMiddleware } from "../auth/auth.middleware.js";
import { getAllLeaders, getTopThree } from "./dailyleaderboard.controller.js";

const router = Router();


router.get('/top3', authMiddleware, getTopThree);
router.get('/dailyleaders', authMiddleware, getAllLeaders);

export default router;