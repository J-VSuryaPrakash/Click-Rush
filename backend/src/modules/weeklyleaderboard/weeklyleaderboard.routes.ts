import { Router } from "express";
import { authMiddleware } from "../auth/auth.middleware.js";
import { getAllLeaders, getTopThree } from "./weeklyleaderboard.controller.js";

const router = Router();


router.get('/top3daily', authMiddleware, getTopThree);
router.get('/weeklyleaders', authMiddleware, getAllLeaders);

export default router;