import type { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError.js";

type ErrorPayload = {
    success: false;
    error: {
        code: string;
        message: string;
        details?: unknown;
    };
};

const buildErrorPayload = (
    code: string,
    message: string,
    details?: unknown
): ErrorPayload => {
    return {
        success: false,
        error: {
            code,
            message,
            ...(details !== undefined && { details }),
        },
    };
};

export const errorMiddleware = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    console.error(err);

    // 1. Application errors
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json(
            buildErrorPayload(
                err.code,
                err.message,
                err.details
            )
        );
    }

    // 3. Unknown/unexpected errors
    return res.status(500).json(
        buildErrorPayload(
            "INTERNAL_SERVER_ERROR",
            "Something went wrong"
        )
    );
};