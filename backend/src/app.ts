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


app.get('/health', (req, res) => {
    res.send('The server is healthy!');
});


export { app };
