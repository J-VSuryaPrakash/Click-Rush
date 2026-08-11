import { Router } from "express";
import { authMiddleware } from "../auth/auth.middleware.js";
import { getUser, getUserBestScore, getUserGameHistory } from "./user.controller.js";


const router = Router();

router.get('/', authMiddleware, getUser);
router.get('/history', authMiddleware, getUserGameHistory);
router.get('/bestscore', authMiddleware, getUserBestScore);

export default router;
