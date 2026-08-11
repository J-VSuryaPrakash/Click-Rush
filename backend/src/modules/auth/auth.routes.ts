import { createUser, login, logout, refresh } from "./auth.contoller.js"
import { Router } from 'express';
import validate from "../../common/middleware/validate.middleware.js";
import RegisterDTO from "./dto/register.dto.js";
import LoginDTO from "./dto/login.dto.js";
import { authMiddleware } from "../auth/auth.middleware.js"

const router = Router();

router.post('/register', validate(RegisterDTO), createUser);
router.post('/login', validate(LoginDTO), login);
router.post('/logout', authMiddleware, logout);
router.post('/tokenrefresh', refresh);

export default router;
