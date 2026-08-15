import { Router } from "express";
import { authMiddleware } from "../auth/auth.middleware.js";
import { getGlobalLeaders, getUser, getUserGameHistory, getUserRanks } from "./user.controller.js";


const router = Router();

router.get('/', authMiddleware, getUser);
router.get('/history', authMiddleware, getUserGameHistory);
router.get('/ranks', authMiddleware, getUserRanks);
router.get('/leaders', authMiddleware, getGlobalLeaders);

export default router;
