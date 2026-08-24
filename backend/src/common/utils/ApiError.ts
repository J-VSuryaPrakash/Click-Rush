class ApiError extends Error {
    statusCode: number;
    code: string;
    details?: unknown;

    constructor(
        statusCode: number,
        message: string,
        code: string,
        details?: unknown
    ) {
        super(message);

        this.statusCode = statusCode;
        this.code = code;
        this.details = details;

        this.name = "ApiError";

        Error.captureStackTrace(this, this.constructor);
    }

    static invalidData(error: any) {
        return new ApiError(400, error, "INVALID_DATA");
    }

    static existingUser(error: string) {
        return new ApiError(409, error, "USER_EXISTS");
    }

    static userNotFound(error: string) {
        return new ApiError(404, error, "USER_NOT_FOUND");
    }

    static invalidPassword(error: string) {
        return new ApiError(401, error, "INVALID_PASSWORD");
    }

    static serverError(error: string) {
        return new ApiError(500, error, "INTERNAL_SERVER_ERROR");
    }

    static invalidToken(error: string) {
        return new ApiError(401, error, "INVALID_TOKEN");
    }
}

export default ApiError;