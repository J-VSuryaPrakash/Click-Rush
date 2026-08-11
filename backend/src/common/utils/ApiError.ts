class ApiError extends Error{
    constructor(statuscode: number, message: string){
        super(message);
        Error.captureStackTrace(this, this.constructor);
    }

    static invalidData(error: any){
        return new ApiError(400, error);
    }

    static existingUser(error: string){
        return new ApiError(409, error);
    }

    static userNotFound(error: string){
        return new ApiError(404, error);
    }   

    static invalidPassword(error: string){
        return new ApiError(401, error)
    }

    static serverError(error: string){
        return new ApiError(500, error);
    }

    static invalidToken(error: string){
        return new ApiError(401, error);
    }
}

export default ApiError;