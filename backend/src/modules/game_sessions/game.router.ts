import { Router } from "express";
import { authMiddleware } from "../auth/auth.middleware.js";
import { createGame, submitGame } from "./game.controller.js";
import validate from "../../common/middleware/validate.middleware.js";
import ScoreDTO from "./dto/score.dto.js";


const router = Router();

router.post('/games/start', authMiddleware, createGame);
router.post('/games/:gameId/complete', authMiddleware, validate(ScoreDTO), submitGame);

export default router;