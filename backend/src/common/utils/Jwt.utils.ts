import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { TokenSchema, type TokenPayload } from '../../modules/auth/token.schema.js';

export const generateAccessToken = (payload: TokenPayload) => {
    const parsedPayload: TokenPayload = TokenSchema.parse(payload);
    return jwt.sign(
        parsedPayload,
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: (process.env.ACCESS_TOKEN_EXPIRY || "1d") as any }
    )
}

export const generateRefreshToken = (payload: TokenPayload) => {
    const parsedPayload: TokenPayload = TokenSchema.parse(payload);
    return jwt.sign(
        parsedPayload,
        process.env.REFRESH_TOKEN_SECRET!,
        { expiresIn: (process.env.REFRESH_TOKEN_EXPIRY || '7d') as any }
    )
}

export const verifyAccessToken = (token: string) => {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    return TokenSchema.parse(decoded);
}

export const verifyRefreshToken = (token: string) => {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);
    return TokenSchema.parse(decoded);
}

export const hashPassword = async (password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

export const verifyPassword = async (password: string, passwordHash: string) => {
    const isValid = await bcrypt.compare(password, passwordHash);
    return isValid;
}