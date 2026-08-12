import { Router } from "express";
import { authMiddleware } from "../auth/auth.middleware.js";
import { storeGameScore } from "./game.controller.js";


const router = Router();

router.post('/gamescore', authMiddleware, storeGameScore);

export default router;