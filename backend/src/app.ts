import http from 'http';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

const app = express();
const httpServer = http.createServer(app);

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(cookieParser());


import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import gameRoutes from "./modules/game_sessions/game.router.js"

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/game/', gameRoutes);

app.get('/health', (req, res) => {
    res.send('The server is healthy!');
});


export { app };
