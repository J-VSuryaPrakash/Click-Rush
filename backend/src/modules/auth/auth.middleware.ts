import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../../common/utils/Jwt.utils.js";
import { db } from "../../common/db/index.js";
import { users } from "../../common/db/schema.js";
import { eq } from "drizzle-orm";
import ApiError from "../../common/utils/ApiError.js";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const accessToken = req.cookies.accessToken;
        const decodeToken = verifyAccessToken(accessToken);

        const [user] = await db.select().from(users).where(eq(users.id, decodeToken.id));

        if (!user) {
            throw ApiError.invalidToken('Forbidden access');
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in middleware",error);
    }
}
